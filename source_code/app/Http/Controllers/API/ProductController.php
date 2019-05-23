<?php
namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;

use App\Models\Product;
use App\Models\Translate_in;
//use App\Models\Role;
use App\User;
use Validator;
use DB;
use Illuminate\Validation\Rule;

class ProductController extends Controller{


	public function list(Request $request){

		$user = Auth::user();
		$user_id = $user->id;
		//add permisson controller
		/*$permission_get = permission_get($user_id);
		$product_id_array = array();
		foreach ($permission_get as $key => $value) {
			$product_id_array[] = $value['product_id'];
		}*/
		$users_name = $user->name;

		$product_name = $request->get('product_name');
		$page=$request->get('page',1);
		$count=$request->get('count',10);
		$priority = $request->get('priority');
		
		$where[] = array('product.users_name','=',$users_name);
		if(!empty($product_name)){
            $where[] = array('product','like','%'.$product_name.'%');
        }
        if(!empty($priority)){
        	$where[] = array('priority','=',$priority);
        }
		$product_get =  Product::where($where)
				->paginate($count,['*'],'page',$page)
				->toArray();
		//get product_get_id as array
		$i = 0;
		$product_id_array = array();
	    while ( $i < count($product_get['data'])) {
	       	$product_id_array[] = $product_get['data'][$i]['id'];
	        $i++;
	    }
	    $Count_status = array();
	    if(!empty($product_id_array)){
		    $Count_status = Translate_in::select(DB::raw("count(translate_in.status) as nums,translate_in.status"))
		    				->addselect('product_id')
		    				->join('product','product.id','=','translate_in.product_id')
			           		->where($where)
			            	->whereIn('product.id',$product_id_array)
			            	->groupBy('translate_in.product_id','translate_in.status')
			            	->get()
			            	->toArray();
		}
		$static = array();
		if(!empty($Count_status)){
			foreach ($Count_status as $key => $value) {
			    $static[$value['product_id']][$value['status']] = $value['nums'];
			    if(isset($static[$value['product_id']]['total_nums'])){
			    	$static[$value['product_id']]['total_nums'] += $value['nums'];
			    }else{
			    	$static[$value['product_id']]['total_nums'] = $value['nums'];
			    }			     
			}
		}

		if(!empty($product_get['data'])){
			foreach ($product_get['data'] as $key_data => $value_data) {
				if(array_key_exists($value_data['id'],$static)){
					array_key_exists('Qualified',$static[$value_data['id']]) ? ($Qualified_nums_p = $static[$value_data['id']]['Qualified']) : ($Qualified_nums_p = 0);
			       	$Total_nums_p = $static[$value_data['id']]['total_nums'];
			       	if($Qualified_nums_p === $Total_nums_p){
			       		$product_get['data'][$key_data]['is_completed'] = 1;
			       	}else{
			       		$product_get['data'][$key_data]['is_completed'] = 0;
			       	}
				}else{
					$product_get['data'][$key_data]['is_completed'] = 1;
				}
			}
		}

		return response()->json(['result' => $product_get], 200);
		
	}

	public function add(Request $request){

		$validator = Validator::make($request->all(), [
            'product' => 'required | unique :product,product',
            'deadline' => 'required', 
            'lang' => 'required',
            'translate_users'=>'required | json',
            'approve_users'=>'required | json',
            'viewed_users'=>'present | json',
            'attribute'=>['required',Rule::in(['public','private'])],
            'priority'=>['required',Rule::in([1,2,3])],
            'product_desc' => 'present',
        ]); 

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $input = $request->all();
        $user = Auth::user();

		$Product = new Product;

		$Product->product = $input['product'];
        $Product->deadline = $input['deadline'];
        $Product->lang = $input['lang'];
        $Product->users_name = $user->name;
        $Product->translate_users = $input['translate_users'];
        $Product->approve_users = $input['approve_users'];
        if($input['attribute'] === 'private'){
        	$Product->viewed_users = $input['viewed_users'];
        }
        $Product->attribute = $input['attribute'];
        $Product->priority = $input['priority'];
       /* $Product->product_desc = ($input['product_desc'] !== NULL) ? $input['product_desc'] : '';*/
        $Product->product_desc = $input['product_desc'];

        $res = $Product->save();

        /* $Role = new Role;

        $Role->users_id = $user->id;
        $Role->permission = json_encode(array('1','4'));
        $Role->product_id = $Product->id;

        $res2 = $Role->save();
        ///when create a new project,should update the role table and return new permission
        $new_permission = uppermission_mem($user->id,$user->email);*/

        if($res){
			return response()->json(['success' => 'Successful'], 200);
		}else{
			return response()->json(['error' => 'Failed'], 200);
		}
	}


	public function download_csv(Request $request){
		$file_name = 'Importitems_table.csv';
		return response()->json(['require' => asset('storage/excel/'.$file_name)], 200);
	}

	public function list_users(Request $request){

		$user_name = $request->get('user_name');
		$page=$request->get('page',1);
		$count=$request->get('count',1000);
		
		if(!empty($user_name)){
            $where[] = array('name','like','%'.$user_name.'%');
        }else{
            $where[] = array('id','>',0);
        }
		return User::where($where)
				->paginate($count,['*'],'page',$page);
	}

	public function product_details(Request $request){
		$validator = Validator::make($request->all(), [
            'product_id' => 'required | integer',
        ]); 

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $input = $request->all();

		$user = Auth::user();
		$user_id = $user->id;	
		$users_name = $user->name;

		$product_id = $request->get('product_id');
		$page=$request->get('page',1);
		$count=$request->get('count',10);
		
		$where[] = array('users_name','=',$users_name);
		if(!empty($product_id)){
            $where[] = array('product.id','=',$product_id);
        }

		return Product::where($where)
				->select('product','users_name','lang','deadline','translate_users','approve_users','viewed_users',
					'status','product.created_at','product.updated_at','attribute','priority','product_desc')
				->addselect('version_name','version_id','version.created_at as version_created_at')
				->leftjoin('version','product.id','=','version.product_id')
				->orderBy('version.id','DESC')
				->paginate($count,['*'],'page',$page);
	}

	public function add_t_ap(Request $request){

		$validator = Validator::make($request->all(), [
            'id' => 'required | integer',          
            'users'=>'required | json',
            'role'=>['required',Rule::in(['translator','reviewer','viewer'])],
        ]); 
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
        $input = $request->all();

        $id = $input['id'];
        $role = $input['role'];
        $users_add = $input['users'];

        $user = Auth::user();
        $uid = $user->id;
        $users_name = $user->name;

		$product_find = Product::where([['id','=',$id],['users_name','=',$users_name]])->first();
		if(empty($product_find)){
			return response()->json(['error' => 'Failed'], 200);
			die();
		};
		if(($product_find->attribute === 'public') && ($role === 'viewer')){
			return response()->json(['error' => 'Failed'], 200);
			die();
		}
		switch ($role) {
			case 'translator':
				$users_get = 'translate_users';
				break;
			case 'reviewer':
				$users_get = 'approve_users';
				break;
			case 'viewer':
				$users_get = 'viewed_users';
				break;
			default:
				return response()->json(['error' => 'Failed'], 200);
				die();
				break;
		}
		$users_get_array = json_decode($product_find->$users_get,TRUE);

		$users_add = json_decode($users_add,TRUE);
		foreach ($users_add as $key => $value) {
			$users_add[$key] = (int)$value;
		}
		$result=array_intersect($users_get_array,$users_add);
		if(!empty($result)){
			return response()->json(['error' => 'Failed'], 200);
			die();
		}

		$users_new = array_collapse([$users_get_array,$users_add]);
		array_multisort($users_new);
		/*var_dump($users_new);
		die();*/
		$product_find->$users_get = json_encode($users_new);
		$res = $product_find->save();

        if($res){
			return response()->json(['success' => 'Successful'], 200);
		}else{
			return response()->json(['error' => 'Failed'], 200);
		}

	}

	public function edit_product(Request $request){

		$validator = Validator::make($request->all(), [
            'id' => 'required | integer',
            'product' =>'required',    
            'deadline'=>'required',
            'attribute'=>['required',Rule::in(['public','private'])],
            'priority'=>['required',Rule::in([1,2,3])],
            'product_desc' => 'present',
        ]); 
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
        $input = $request->all();

        $id = $input['id'];
        $deadline = $input['deadline'];
        $attribute = $input['attribute'];
        $priority = $input['priority'];
        $product = $input['product'];
        $product_desc = $input['product_desc'];

        $user = Auth::user();
        $uid = $user->id;
        $users_name = $user->name;

        $product_find = Product::where([['id','=',$id],['users_name','=',$users_name]])->first();
		if(empty($product_find)){
			return response()->json(['error' => 'Failed'], 200);
			die();
		}

		if($product_find->product !== $product){
			$product_find->product = $product;
		}
		if(($attribute === 'public') && ($product_find->attribute !== $attribute)){
			$product_find->attribute = $attribute;
		}				
		if($product_find->deadline !== $deadline){
			$product_find->deadline = $deadline;
		}
		if($product_find->priority !== $priority){
			$product_find->priority = $priority;
		}
		if($product_find->product_desc !== $product_desc){
			$product_find->product_desc = $product_desc;
		}

		$res = $product_find->save();
		if($res){
			return response()->json(['success' => 'Successful'], 200);
		}else{
			return response()->json(['error' => 'Failed'], 200);
		}

	}

	public function delete_p(Request $request){

		$validator = Validator::make($request->all(), [
            'id' => 'required | integer',
        ]); 
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
        $input = $request->all();
        $id = $input['id'];

        $user = Auth::user();
        $uid = $user->id;
        $users_name = $user->name;

        $product_find = Product::where([['id','=',$id],['users_name','=',$users_name]])->first();
        if(empty($product_find)){
			return response()->json(['error' => 'Failed'], 200);
			die();
		}
		$translate_in_nums = Translate_in::where('product_id','=',$id)->count();
		if($translate_in_nums>0){
			return response()->json(['error' => 'Failed'], 200);
			die();
		}
		$res = Product::find($id)->delete();
		if($res){
			return response()->json(['success' => 'Successful'], 200);
		}else{
			return response()->json(['error' => 'Failed'], 200);
		}
	}
}

?>