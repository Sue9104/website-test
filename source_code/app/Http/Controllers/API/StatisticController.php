<?php
namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;

use App\Models\Product;
use App\Models\Translate_job;
use App\Models\Translate_in;
use App\Models\Translate_approve;
use App\User;
use Validator;
use Illuminate\Validation\Rule;
use DB;

class StatisticController extends Controller{


	public function ProductAccount(Request $request){

		$validator = Validator::make($request->all(), [
            'product_id' => 'required | integer',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
        $input = $request->all();
        $product_id = $input['product_id'];

		$user = Auth::user();
		$user_id = $user->id;
		$users_name = $user->name;
		//Confirm the permissions
		$product_users_name = Product::where('id',$product_id)->value('users_name');
		if($product_users_name !== $users_name){
			return response()->json(['error' => 'Failed'], 200);
			die();
		}
		
		$where[] = array('translate_in.product_id','=',$product_id);
		$where[] = array('product.users_name','=',$users_name);
		//Each status
		/*$sqlTmp3 = sprintf("count( * ) AS Total,
							count(if(translate_in.status='Unassigned',true,null)) AS Unassigned,
							count(if(translate_in.status='Untranslated',true,null)) AS Untranslated,   
							count(if(translate_in.status='Qualified',true,null)) AS Qualified,
							count(if(translate_in.status='Unreviewed',true,null)) AS Unreviewed
						");*/
		//Get nums
		$data_object = DB::table('translate_in')
						->select(DB::raw("count(translate_in.status) as nums,translate_in.status"))
						->join('product','product.id','=','translate_in.product_id')
						->where($where)
						->groupBy('translate_in.status')
						->get()
						->toArray();
		$Total_nums = DB::table('translate_in')
						->where($where)
						->join('product','product.id','=','translate_in.product_id')
						->count('translate_in.id');

		$data_return = array();
		$data_return['total_nums'] = $Total_nums;

		foreach ($data_object as $key => $value_object) {
			$value_array = json_decode(json_encode($value_object), true);
			$data_return[$value_array['status']] = $value_array['nums'];
		}
		
		array_key_exists('Unassigned',$data_return) ? '':($data_return['Unassigned'] = 0);
		array_key_exists('Untranslated',$data_return) ? '':($data_return['Untranslated'] = 0);
		array_key_exists('Unreviewed',$data_return) ? '':($data_return['Unreviewed'] = 0);
		array_key_exists('Re-translated',$data_return) ? '':($data_return['Re-translated'] = 0);
		array_key_exists('Qualified',$data_return) ? '':($data_return['Qualified'] = 0);

		return response()->json(['result' => $data_return], 200);
		
	}

	public function Accout_list_p(Request $request){

		$validator = Validator::make($request->all(), [
            'Role' => ['required',Rule::in(['translator','reviewer'])]
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
        $input = $request->all();
        
		$page=$request->get('page',1);
        $count=$request->get('count',10);      
        $product_name = $request->get('product_name');
        //get permission by user 
        $user = Auth::user();
        $users_name = $user->name;
        $user_id = $user->id;
        //$user_id = "'".$user_id."'";
        //product_name  Role
		if(!empty($product_name)){
            $where[] = array('product','like','%'.$product_name.'%');
        }

        
	    if($input['Role'] === 'translator') {

	    	$product_get = Product::whereJsonContains('product.translate_users',$user_id)
        				->paginate($count,['*'],'page',$page)
        				->toArray();

	        $product_id_array = array();
	        $i = 0;
	        while ( $i < count($product_get['data'])) {
	        	$product_id_array[] = $product_get['data'][$i]['id'];
	        	$i++;
	        }

	    	if(!empty($product_id_array)){
		        $where[] = array('translate_job.translate_users_name','=',$users_name);
		        $static_get = Translate_job::select('product.id','product.product')
		            ->addselect(DB::raw("count(translate_job.status) as nums,translate_job.status"))	                
		            ->join('product','product.id','=','translate_job.product_id')
		            ->where($where)
		            ->whereIn('product.id',$product_id_array)
		            ->groupBy('product_id','translate_job.status')
		            ->get()
		            ->toArray();
		        $static = array();
		        if(!empty($static_get)){
			        	foreach ($static_get as $key => $value) {
			        	$static[$value['id']][$value['status']] = $value['nums'];
			        }
		        }		        
		        foreach ($product_get['data'] as $key_product => $value_product) {

		        	if(array_key_exists($value_product['id'],$static)){
		        		array_key_exists('Untranslated',$static[$value_product['id']]) ? 
		        		($product_get['data'][$key_product]['Untranslated'] = $static[$value_product['id']]['Untranslated']) :
		        		($product_get['data'][$key_product]['Untranslated'] =0);
		        		array_key_exists('Unreviewed',$static[$value_product['id']]) ? 
		        		($product_get['data'][$key_product]['Unreviewed'] = $static[$value_product['id']]['Unreviewed']) :
		        		($product_get['data'][$key_product]['Unreviewed'] =0);
		        		array_key_exists('Qualified',$static[$value_product['id']]) ? 
		        		($product_get['data'][$key_product]['Qualified'] = $static[$value_product['id']]['Qualified']) :
		        		($product_get['data'][$key_product]['Qualified'] =0);
		        		array_key_exists('Error',$static[$value_product['id']]) ? 
		        		($product_get['data'][$key_product]['Error'] = $static[$value_product['id']]['Error']) :
		        		($product_get['data'][$key_product]['Error'] =0);
		        		array_key_exists('Re-translated',$static[$value_product['id']]) ? 
		        		($product_get['data'][$key_product]['Re-translated'] = $static[$value_product['id']]['Re-translated']) :
		        		($product_get['data'][$key_product]['Re-translated'] =0);
		        	}else{
		        		$product_get['data'][$key_product]['Untranslated'] =0;
		        		$product_get['data'][$key_product]['Unreviewed'] =0;
		        		$product_get['data'][$key_product]['Qualified'] =0;
		        		$product_get['data'][$key_product]['Error'] =0;
		        		$product_get['data'][$key_product]['Re-translated'] =0;
		        	}		        	
		        }
		        return response()->json(['result' => $product_get], 200);
				die();
	        }else{
	        	return response()->json(['result' => $product_get], 200);
				die(); 
	        }

	    }else{
	       	$product_get = Product::whereJsonContains('product.approve_users',$user_id)
        				->paginate($count,['*'],'page',$page)
        				->toArray();

	        $product_id_array = array();
	        $i = 0;
	        while ( $i < count($product_get['data'])) {
	        	$product_id_array[] = $product_get['data'][$i]['id'];
	        	$i++;
	        }

	        if(!empty($product_id_array)){

		        //$where[] = array('translate_approve.approve_users_name','=',$users_name);
		        $static_get = Translate_approve::select('product.id','product.product')
		            ->addselect(DB::raw("count(translate_approve.status) as nums,translate_approve.status"))	                
		            ->join('product','product.id','=','translate_approve.product_id')
		            //->where($where)
		            ->whereIn('product.id',$product_id_array)
		            ->groupBy('product_id','translate_approve.status')
		            ->get()
		            ->toArray();
		        $static = array();
		        if(!empty($static_get)){
			        	foreach ($static_get as $key => $value) {
			        	$static[$value['id']][$value['status']] = $value['nums'];
			        }
		        }
		    	foreach ($product_get['data'] as $key_product => $value_product) {

		        	if(array_key_exists($value_product['id'],$static)){
		        		array_key_exists('Unreviewed',$static[$value_product['id']]) ? 
		        		($product_get['data'][$key_product]['Unreviewed'] = $static[$value_product['id']]['Unreviewed']) :
		        		($product_get['data'][$key_product]['Unreviewed'] =0);
		        		array_key_exists('Qualified',$static[$value_product['id']]) ? 
		        		($product_get['data'][$key_product]['Qualified'] = $static[$value_product['id']]['Qualified']) :
		        		($product_get['data'][$key_product]['Qualified'] =0);
		        		array_key_exists('Error',$static[$value_product['id']]) ? 
		        		($product_get['data'][$key_product]['Error'] = $static[$value_product['id']]['Error']) :
		        		($product_get['data'][$key_product]['Error'] =0);
		        		array_key_exists('Re-translated',$static[$value_product['id']]) ? 
		        		($product_get['data'][$key_product]['Re-translated'] = $static[$value_product['id']]['Re-translated']) :
		        		($product_get['data'][$key_product]['Re-translated'] =0);
		        	}else{
		        		$product_get['data'][$key_product]['Unreviewed'] =0;
		        		$product_get['data'][$key_product]['Qualified'] =0;
		        		$product_get['data'][$key_product]['Error'] =0;
		        		$product_get['data'][$key_product]['Re-translated'] =0;
		        	}		        	
		        }
  				return response()->json(['result' => $product_get], 200);
				die(); 
		    }else{
		    	return response()->json(['result' => $product_get], 200);
				die(); 
		    }
	    }
	}

	public function Accout_task_p(Request $request){//owner 

		$validator = Validator::make($request->all(), [
            'product_id' => 'required | integer',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
        $input = $request->all();

        $user = Auth::user();
        $users_name = $user->name;
        $user_id = $user->id;
        $product_id = $input['product_id'];
        //certain permisson of owner
        $product_users_name = Product::where('id',$product_id)->value('users_name');
		if($product_users_name !== $users_name){
			return response()->json(['error' => 'Failed'], 200);
			die();
		}

    	$static_t_get = Translate_job::select('product.product','translate_job.translate_users_name')
		            ->addselect(DB::raw("count(translate_job.status) as nums,translate_job.status"))	                
		            ->join('product','product.id','=','translate_job.product_id')
		            ->where('product.id','=',$product_id)
		            ->groupBy('translate_job.status')
		            ->get()
		            ->toArray();
		$static_t = array();//static for translate_job of product
		if(!empty($static_t_get)){
			foreach ($static_t_get as $key => $value) {
				$static_t[$value['translate_users_name']][$value['status']] = $value['nums'];
			}
			foreach ($static_t as $key_t => $value_t) {
				array_key_exists('Untranslated',$value_t) ? '': ($static_t[$key_t]['Untranslated'] = 0);
				array_key_exists('Unreviewed',$value_t) ? '': ($static_t[$key_t]['Unreviewed'] = 0);
				array_key_exists('Qualified',$value_t) ? '': ($static_t[$key_t]['Qualified'] = 0);
				array_key_exists('Error',$value_t) ? '': ($static_t[$key_t]['Error'] = 0);
				array_key_exists('Re-translated',$value_t) ? '': ($static_t[$key_t]['Re-translated'] = 0);
			}
		}

		$static_a = array();
		$static_a_get = Translate_approve::select('product.product','translate_approve.approve_users_name')
		            ->addselect(DB::raw("count(translate_approve.status) as nums,translate_approve.status"))	                
		            ->join('product','product.id','=','translate_approve.product_id')
		            ->where('product.id','=',$product_id)
		            ->groupBy('translate_approve.status','translate_approve.approve_users_name')
		            ->get()
		            ->toArray();
		
		if(!empty($static_a_get)){
			foreach ($static_a_get as $key_a => $value_a) {
				if($value_a['approve_users_name'] === NULL){
					$static_a[$value_a['status']] = $value_a['nums'];
				}else{
					$static_a[$value_a['approve_users_name']][$value_a['status']] = $value_a['nums'];
				}			
			}

			foreach ($static_a as $key_aa => $value_aa) {
				if($key_aa === 'Unreviewed'){
					continue;
				}
				array_key_exists('Qualified',$value_aa) ? '': ($static_a[$key_aa]['Qualified'] = 0);
				array_key_exists('Error',$value_aa) ? '': ($static_a[$key_aa]['Error'] = 0);
				array_key_exists('Re-translated',$value_aa) ? '': ($static_a[$key_aa]['Re-translated'] = 0);
			}
		}

		$return = array();
		$return['static_t'] = $static_t;
		$return['static_a'] = $static_a;

		return response()->json(['result' => $return], 200);
		die(); 
	}

	public function Accout_task_nums(Request $request){

		$user = Auth::user();
        $users_name = $user->name;
        $user_id = $user->id;

        $where_owner[] = array('translate_in.users_name','=',$users_name);
        $where_owner[] = array('translate_in.status','=','Unassigned');
        /*$Unassigned_nums = Translate_in::select(DB::raw("count(translate_in.id) as nums,product.id,product.product"))
						->join('product','product.id','=','translate_in.product_id')
						->where($where_owner)
						->get()
						->toArray();*/
		$Unassigned_nums = Translate_in::where($where_owner)
						->count();

		$where_t[] = array('translate_job.translate_users_name','=',$users_name);
		$where_t[] = array('translate_job.status','=','Re-translated');
		$where_t_re[] = array('translate_job.status','=','Untranslated');
		$where_t_re[] = array('translate_job.translate_users_name','=',$users_name);
		$Translate_nums = Translate_job::where($where_t)
		        ->orWhere($where_t_re)
		        ->select(DB::raw("count(translate_job.status) as nums,translate_job.status"))
		        ->groupBy('translate_job.status')
		        ->get()
		        ->toArray();
		        //->count('translate_job.id');
		$Untranslated_nums = $Re_translated_nums = 0;
		if(!empty($Translate_nums)){
			foreach ($Translate_nums as $key => $value) {
				if($value['status'] === 'Re-translated'){
					$Re_translated_nums = $value['nums'];
				}else{
					$Untranslated_nums = $value['nums'];
				}
			}
		}
		
		$Approve_nums = Translate_approve::join('product','product.id','=','translate_approve.product_id')
				->whereJsonContains('product.approve_users',$user_id)
				->where('translate_approve.status','=','Unreviewed')
				->count();

		$Conflict_nums = Translate_approve::join('product','product.id','=','translate_approve.product_id')
				->where('product.users_name','=',$users_name)
				->where([['translate_approve.conflict','=',1],['translate_approve.status','=','Qualified']])
				->count();

		$data_return['Unassigned_nums'] = $Unassigned_nums;
		$data_return['Untranslated_nums'] = $Untranslated_nums;
		$data_return['Re_translated_nums'] = $Re_translated_nums;
		$data_return['Approve_nums'] = $Approve_nums;
		$data_return['Conflict_nums'] = $Conflict_nums;
		return response()->json(['result' => $data_return], 200);
		die(); 
		
	}

}