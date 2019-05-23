<?php
namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use App\User;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\UploadedFile;
use App\Models\Log;

use App\Imports\TranslateImport;
use App\Models\Translate_in;
use App\Models\Translate_job;
use App\Models\Translate_approve;
use App\Models\Product;

class TranslateController extends Controller 
{
    
    public function Translate_import(Request $request){

        $validator = Validator::make($request->all(), [
            'product_id' => 'required',
            'translate_import'=> '| max:2048',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        if ($request->hasFile('translate_import')) {
            if ($request->file('translate_import')->isValid()) {

                $user = Auth::user();
                $users_name = $user->name;
                $user_id = $user->id;

                $product_id = $request['product_id'];

                $Product_name_find = Product::where('id',$product_id)->value('users_name');
                if($Product_name_find !== $users_name){
                    return response()->json(['error' => 'Failed'], 200);
                    die();
                }

                $file=$request->file('translate_import');
                //$fileextension=$file->getClientOriginalExtension();              
                $file_name = $user_id.time().'translate_import.'.'csv';

                $path = $request->file('translate_import')->storeAs('/translateimport', $file_name, 'excel');
                $md5_array = Excel::toArray(new TranslateImport,$file_name,'translateimport');

                $success_insert = array();
                $error_row = array();
                $row_key = array();
                $success_input = array();
                $field_num = Product::where('id',$product_id)->value('field_num');//the max num for field
                $field_num_insert = false;//time to import

                foreach ($md5_array[0] as $key => $value) {
                    if($key === 0){
                        if($field_num === NULL){//first time to import the project
                            foreach ($value as $v_k=> $v_v) {
                                $v_v = trim($v_v);
                                if(empty($v_v)){
                                    $value = array_except($value, [$v_k]);
                                }
                            }
                            $field_num = count($value)-1;
                            $field_num_insert = true;//first time to import
                        }                      
                        continue;
                    }else{
                        $not_insert_tip = $error_insert_tip  ='';                
                        $notinsert = $errorinsert = $numinsert = 0;
                        $date_tip = $num_tip =$num2_tip = $sop_tip = $units_tip =0;

                        foreach ($value as $field => $input) {
                            $input = trim($input);
                            $value[$field] = $input;

                            if($field === 0){
                                if($input === NULL || $input === ''){
                                  $notinsert ++;
                                }
                            }else{
                                if(empty($input)){
                                    $value = array_except($value, [$field]);
                                }
                            }                      
                        }

                        if(count($value) > ($field_num+1)){
                                $numinsert++;
                        }
                        
                        if($notinsert > 0){
                            $not_insert_tip .="An invalid null value exists in the required field";
                            $error_row[] = array('error_row'=>$key+1,'tips'=>$not_insert_tip);
                        }elseif($numinsert > 0){//too many fields for value
                            $not_insert_tip .="too many fields";
                            $error_row[] = array('error_row'=>$key+1,'tips'=>$not_insert_tip);
                        }else{
                            if($errorinsert > 0){
                                $error_inster_array = array('input'=>$value);
                                if($date_tip>0){
                                    $error_insert_tip .="";
                                }                       
                                if($num2_tip){
                                    $error_insert_tip .="";
                                }
                                if($sop_tip){
                                    $error_insert_tip .="";
                                }
                                if($units_tip){
                                    $error_insert_tip .="";
                                }
                                $error_row[] = array('error_row'=>$key+1,'tips'=>$error_insert_tip);
                            }else{
                                $success_input[] = $value;
                            }                           
                        }
                    }
                }

                if(!empty($success_input)){
                    $insert_nums = 0;
                    $date_time = date("Y-m-d H:i:s");

                    foreach ($success_input as $insert_filed => $insert_value) {

                            $translate_key = $insert_value[0];
                            $translate_array = array_values(array_except($insert_value, [0]));
                            $translate_json = json_encode($translate_array);

                            $update_array = array(
                                'key' => $translate_key,
                                'translate' => $translate_json,
                                'product_id' => $product_id,
                                'users_name' => $users_name,
                                'status'=> 'Unassigned',
                                'created_at'=>$date_time,
                                'updated_at'=>$date_time,
                            );

                            $where = array();

                            $where_exist[] = array('key','=',$translate_key);
                            $where_exist[] = array('translate','=',$translate_json);
                            $where_exist[] = array('product_id','=',$product_id);
                            $where_exist[] = array('users_name','=',$users_name);
                            //$where_exist[] = array('status','=','Unassigned');
                            
                            $find_exist = DB::table('translate_in')->where($where_exist)->first();
                            /*var_dump($where_exist);
                            var_dump($find_exist);*/
                            unset($where_exist);

                            if($find_exist !== NULL){
                                $row_key[] = array('row_key'=>$translate_key,'tips'=>'The entry already exists');// and is not assigned
                            }else{
                                $translate_in = DB::table('translate_in')->insert($update_array);

                                if($update_array){
                                    $insert_nums++;                                
                                }else{
                                    $row_key[] = array('row_key'=>$translate_key,'tips'=>'The entry imports an exception');
                                }
                            }                           
                    }
                }

                if( ($insert_nums>0) && $field_num_insert ){
                    Product::where('id',$product_id)->update(['field_num'=>$field_num]);
                }

                $success_insert[] =array('success_nums'=>$insert_nums);

                /*$Log = new Log;
                $Log->log_content = json_encode($md5_array);
                $Log->log_model_type = 'plasm';
                $Log->log_action = 'import';
                $Log->log_user = $user->name;
                $Log->save();*/
                $result_return= array('success_nums'=>$success_insert,'error_row'=>$error_row,'row_key'=>$row_key);

            return response()->json(['result' => $result_return], 200);  

            }
        }else{
            return response()->json(['error' => 'Failed'], 200);
        }

    }

    public function list(Request $request){//list owner items

        $validator = Validator::make($request->all(), [
            'product_id' => 'present',
        ]); 

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $input = $request->all();
        //get data
        $page=$request->get('page',1);
        $count=$request->get('count',10);
        $key = $request->get('key');
        $status = $request->get('status');
        $product_id = $request->get('product_id');

        $where[] = array('translate_in.id','>',0);
        //product_id
        if(!empty($product_id)){
            $where[] = array('product_id','=',$product_id);
        }
        //key status
        if(!empty($key)){
            $where[] = array('key','like','%'.$key.'%');
        }
        if(!empty($status)){
            $where[] = array('translate_in.status','=',$status);
        }
        //get permission by user 
        $user = Auth::user();
        $users_name = $user->name;
        $user_id = $user->id;

        /*$permission_get = permission_get($user_id,$product_id);
        if(empty($permission_get)){
            return response()->json(['error' => 'Failed'], 200);
        }
        $permission = $permission_get[0]['permission'];
        $permission_array = json_decode($permission,TRUE);*/

        //query
        //if(in_array('1',$permission_array)){//owner return the translate_in table data
        $where[] = array('translate_in.users_name','=',$users_name);
        return Translate_in::select('translate_in.id','translate_in.users_name','translate_in.product_id','translate_in.key','translate_in.translate','translate_in.status','translate_in.created_at','translate_in.updated_at')
                ->addselect('product.translate_users','product.lang')
                ->join('product','translate_in.product_id','=','product.id')
                ->where($where)
                ->orderBy('translate_in.updated_at','DESC')
                ->paginate($count,['*'],'page',$page);
        /*}else{
            return response()->json(['error' => 'Failed'], 200);
        }  */            
    }

    public function assign(Request $request){

        $validator = Validator::make($request->all(), [
            'translate_in_id' => 'required | json',// ["1","2","3"]
            'translate_users_name' => 'required',
            /*'allocate_users_name' => 'required', */     
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $input = $request->all();

        $user = Auth::user();
        $users_name = $user->name;       

        $translate_in_array = json_decode($input['translate_in_id'],TRUE);
        $translate_users_name = $input["translate_users_name"];

        $allocate_users_name = $users_name;

        if(!empty($translate_in_array)){
            //find user_id by translate_users_name
            $translate_users_id = User::where('name','=',$translate_users_name)->value('id'); 
            if(empty($translate_users_id)){
                return response()->json(['error' => 'Failed'], 200);
            }
            //can only assign one product per time
            $product_id_find = Translate_in::select('translate_in.product_id')
                                ->whereIn('translate_in.id',$translate_in_array)
                                ->join('product','translate_in.product_id','=','product.id')
                                ->distinct()
                                ->get()
                                ->toArray();
            if(count($product_id_find) !== 1){
                return response()->json(['error' => 'Failed'], 200);
            }
            //get translate_users by product_id_find
            $translate_users_find = Product::where('id',$product_id_find)->value('translate_users');
            $translate_users_find = json_decode($translate_users_find,TRUE);
            if(!in_array($translate_users_id, $translate_users_find)){
                return response()->json(['error' => 'Failed'], 200);
            }                          
            //get items
            $translate_in = Translate_in::select('translate_in.id','translate_in.users_name','translate_in.product_id','translate_in.key','translate_in.translate','translate_in.status')
                        ->addselect('product.lang')                      
                        ->join('product','translate_in.product_id','=','product.id')
                        ->whereIn('translate_in.id',$translate_in_array)
                        ->get()
                        ->toArray();

            $insert_array = array();
            $inser_id = array();
            $value_error = array();
            $date_time = date("Y-m-d H:i:s");

            foreach ($translate_in as $key => $value) {
                if(($value['status'] === 'Unassigned')&&($value['users_name'] === $users_name)){//status users_name product_id
                    $inser_id[] = $value['id'];

                    $value_new = array_except($value, ['users_name']);//remove users_name

                    $value_new['translate_id'] = $value_new['id'];
                    $value_new = array_except($value_new, ['id']);
                    $value_new['translate_users_name'] = $translate_users_name;
                    $value_new['allocate_users_name'] = $allocate_users_name;
                    $value_new['status'] = 'Untranslated';
                    $value_new['created_at'] = $date_time;
                    $value_new['updated_at'] = $date_time;

                    $insert_array[] = $value_new;
                    unset($value_new);
                }  
            }

            $res1 = $res2 = true;
            if(!empty($insert_array)){
                DB::beginTransaction();
                try{
                    $res1 = DB::table('translate_job')->insert($insert_array);
                    $res2 = DB::table('translate_in')->whereIn('id',$inser_id)->update(['status'=>'Untranslated','updated_at'=>$date_time]);
                    DB::commit();
                }catch(Exception $e){
                    DB::rollBack();
                    return response()->json(['error' => 'Failed'], 200);
                }                      
            }

            
            if($res1&($res2 === count($inser_id))){
                return response()->json(['success' => 'Successful'], 200);
            }else{
                return response()->json(['error' => 'Failed'], 200);
            }
        }else{
            return response()->json(['error' => 'Failed'], 200);
        }
    }

    public function translate_list(Request $request){//list Untranslated

        //get data
        $page=$request->get('page',1);
        $count=$request->get('count',10);

        $id = $request->get('id');
        $key = $request->get('key');
        $product_name = $request->get('product_name');
        $status = $request->get('status');
        $priority = $request->get('priority');
        $deadline = $request->get('deadline');
        //$status = 'Re-translated';

        //get permission by user 
        $user = Auth::user();
        $users_name = $user->name;
        $user_id = $user->id;
        //query
        $where[] = array('translate_job.translate_users_name','=',$users_name);//
        if(!empty($id)){
            $where[] = array('translate_job.id',$id);
        }
        if(!empty($key)){
            $where[] = array('translate_job.key','like','%'.$key.'%');
        }
        if(!empty($product_name)){
            $where[] = array('product.product','like','%'.$product_name.'%');
        }
        if(!empty($status)){
            $where[] = array('translate_job.status','=',$status);
        }else{
            $where[] = array('translate_job.status','=','Untranslated');
        }
        if(!empty($priority)){
            if(!in_array($priority,array(1,2,3))){
                return response()->json(['error' => 'Failed'], 200);
                die();
            }
            $where[] = array('product.priority','=',$priority);
        }
        if(!empty($deadline)){
            $where[] = array('product.deadline', '<=', $deadline);
        }

        $translate_job_count = DB::table('translate_job')
                ->select(DB::raw("COUNT(translate_job.id) as total"))
                ->join('product','translate_job.product_id','=','product.id')
                ->where($where)
                ->get()
                ->toArray();
        $nums_total = $translate_job_count[0]->total;
        $start = $page*$count-$count;
        $take = $count;

        $translate_job = DB::table('translate_job')
                ->select('translate_job.translate_id')
                ->join('product','translate_job.product_id','=','product.id')
                ->where($where)
                ->skip($start)
                ->take($take);
                //->get();

        $translate_approve_id= DB::table('translate_approve')
                ->select('translate_approve.id as app_id','translate_approve.translate_id')
                ->JoinSub($translate_job, 'latest_posts', function($join) {
                    $join->on('translate_approve.translate_id', '=', 'latest_posts.translate_id');
                })
                ->get()
                ->toArray();
                //->tosql();
        $approve_id = array();
        $approve_id_array = array();
        $approve_get_array = array();

        if(!empty($translate_approve_id)){
            foreach ($translate_approve_id as $KEY=> $VALUE){
                $find = array_search($VALUE->translate_id,$approve_id,TRUE);
                if($find == false){
                    $approve_id[$VALUE->app_id] = $VALUE->translate_id;
                }else{
                    if($find < $VALUE->app_id){
                        unset($approve_id[$find]);
                        $approve_id[$VALUE->app_id] = $VALUE->translate_id;
                    }
                }
                
            }
        }

        if(!empty($approve_id)){
            $approve_id_array = array_keys($approve_id);
        }
        //var_dump($approve_id_array);
        $approve_get = translate_approve::whereIn('id', $approve_id_array)
                        ->orderBy('translate_id')
                        ->get()
                        ->toArray();
        if(!empty($approve_get)){
            foreach ($approve_get as $k_approve_get => $v_approve_get) {
                $approve_get_array[$v_approve_get['translate_id']] = $v_approve_get;
            }
        }

        $translate_job2 = Translate_job::select('translate_job.id','translate_job.translate_id','translate_job.key','translate_job.translate','translate_job.status','translate_job.lang','translate_job.translate_users_name','translate_job.allocate_users_name','translate_job.created_at','translate_job.updated_at')
                ->addselect('product.product','product.priority','product.deadline')
                ->join('product','translate_job.product_id','=','product.id')
                ->where($where)
                ->skip($start)
                ->take($take)
                ->orderBy('translate_job.translate_id')
                ->get()
                ->toArray();
        if(!empty($translate_job2)){
            foreach ($translate_job2 as $key_tran_j => $value_tran_j) {
                if(!empty($approve_get_array[$value_tran_j['translate_id']])){
                    $translate_job2[$key_tran_j]['approve'] = $approve_get_array[$value_tran_j['translate_id']];
                }         
            }
        }
        
        $result = array();
        $result['total'] = $nums_total;
        $result['data'] = $translate_job2;
        return response()->json(['result' => $result], 200); 
    }

    public function translate(Request $request){

        $validator = Validator::make($request->all(), [
            'translate_job_id' => 'required',
            'key_translation'=> 'required | json',
            'fields_translation'=>'present',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $input = $request->all();

        $user = Auth::user();
        $users_name = $user->name; 

        $translate_job_id = $input['translate_job_id'];
        $key_translation = $input['key_translation'];
        $fields_translation = $input['fields_translation'];

        $translate_job_find = Translate_job::where('id','=',$translate_job_id)->first()->toArray();
        if($translate_job_find['translate_users_name'] !== $users_name){
            return response()->json(['error' => 'Failed'], 200);
        }
        if(($translate_job_find['status'] !== 'Untranslated') &&($translate_job_find['status'] !== 'Re-translated')){
            return response()->json(['error' => 'Failed'], 200);
        }

        $translate_in_id = $translate_job_find['translate_id'];//join id

        $insert = $translate_job_find;
        $date_time = date("Y-m-d H:i:s");

        $insert['translate_job_id'] = $insert['id'];
        $insert = array_except($insert, ['id']);
        $insert = array_except($insert, ['created_at']);
        $insert = array_except($insert, ['updated_at']);
        $insert['key'] = $key_translation;
        $insert['translate'] = $fields_translation;
        $insert['status'] = 'Unreviewed';
        $insert['created_at'] = $date_time;
        $insert['updated_at'] = $date_time;

        

        DB::beginTransaction();
        
        try{
            
            $res1 = DB::table('translate_approve')->insert($insert);
            $res2 = DB::table('translate_job')->where('id',$translate_job_id)->update(['status'=>'Unreviewed','updated_at'=>$date_time]);
            $res3 = DB::table('translate_in')->where('id',$translate_in_id)->update(['status'=>'Unreviewed','updated_at'=>$date_time]);
            DB::commit();
                
        }catch(Exception $e){
            DB::rollBack();
            return response()->json(['error' => 'Failed'], 200);
        } 
        
        if($res1&$res2&$res3){
            return response()->json(['success' => 'Successful'], 200);           
        }else{
            return response()->json(['error' => 'Failed'], 200);
        }

    }

    public function translate_bygoogle(Request $request){
        $validator = Validator::make($request->all(), [
            'translate_contents' => 'required',
            'lang'=>'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $input = $request->all();
        $do_command = "trans -t '".$input['lang']."' -b ".$input['translate_contents'];
        //$do_command = "nohup bash -c "."'".$cd_dir.$co_dir.$command."' >/media/1.log &";
        exec($do_command,$res,$code);
        if($code === 0){
            return response()->json(['result' => $res], 200); 
        }else{
            return response()->json(['error' => 'Failed'], 200);
        }
    }

    public function translate_history(Request $request){
        //get data
        $page=$request->get('page',1);
        $count=$request->get('count',10);

        $id = $request->get('id');
        $product_name = $request->get('product_name');
        $key = $request->get('key');      
        $status = $request->get('status');
        $date=$request->get('date');
        //$reportdate = array('2018-01-03','2019-01-03');//test

        //get permission by user 
        $user = Auth::user();
        $users_name = $user->name;
        $user_id = $user->id;
        //query
        $where[] = array('translate_approve.translate_users_name','=',$users_name);//

        if((!empty($date)) && (is_array($date))){          
            $where[] = array('translate_approve.updated_at','>=',$date[0]);
            $where[] = array('translate_approve.updated_at','<=',$date[1]);
        }

        if(!empty($id)){
            $where[] = array('translate_approve.id','=',$id);
        }
        if(!empty($key)){
            $where[] = array('translate_approve.key','like','%'.$key.'%');
        }
        if(!empty($product_name)){
            $where[] = array('product.product','like','%'.$product_name.'%');
        }
        if(!empty($status)){
            $where[] = array('translate_approve.status','=',$status);
        }

        return Translate_approve::select('translate_approve.id','translate_approve.translate_id','translate_approve.product_id','translate_approve.key','translate_approve.translate','translate_approve.status','translate_approve.tips','translate_approve.created_at','translate_approve.updated_at')
            ->addselect('translate_approve.translate_users_name','translate_approve.allocate_users_name','translate_approve.approve_users_name')
            ->addselect('product.translate_users','product.lang','product.product')
            ->where($where)
            ->join('product','product.id','=','translate_approve.product_id')
            ->orderBy('translate_approve.id','DESC')
            ->paginate($count,['*'],'page',$page);
    }

    public function trans_pro_list(Request $request){

        $request->filled('page') ? ($page = $request->get('page')) : ($page = 1);
        $request->filled('count') ? ($count = $request->get('count')) : ($count = 10);

        $product_name = $request->get('product_name');
        $priority = $request->get('priority');

        //get permission by user 
        $user = Auth::user();
        $users_name = $user->name;
        $user_id = $user->id;
        //product_id
        $where[] = array('id','>',0);
        if(!empty($product_name)){
            $where[] = array('product','like','%'.$product_name.'%');
        }
        if(!empty($priority)){
            $where[] = array('priority','=',$priority);
        }

        return  DB::table('product')
                ->select('*')
                ->where($where)
                ->whereJsonContains('product.translate_users',$user_id)
                /*->orWhereRaw($sqlTmp2)
                ->orWhereRaw($sqlTmp3)
                ->orWhere('product.users_name','=',$users_name)*/
                ->paginate($count,['*'],'page',$page);

    }

   
}