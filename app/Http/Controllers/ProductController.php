<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;


class ProductController extends Controller
{

    public function getAllProducts(){
        $products = Product::all();
        return response()->json([
            'products' => $products
        ], 200);
    }

    public function add_product(Request $request){

        $product = new Product();

        $product->name = $request->name;
        $product->description = $request->description;
        if($request->image !=''){
            $strpos = strpos($request->image, ';');
            $sub = substr($request->image, 0, $strpos);
            $ex = explode('/', $sub)[1];
            $name = time().'.'.$ex;
            $img = Image::make($request->image)->resize(117, 100);
            $upload_path = public_path()."/upload/";
            $img->save($upload_path.$name);
            $product->image = $name;
        }else{
            $product->image = 'image.png';
        }
        $product->image = $name;
        $product->type = $request->type;
        $product->stock = $request->stock;
        $product->price = $request->price;
        $product->save();
    }

    public function getEditProducts ($id){
        $product = Product::find($id);
        return response()->json([
            'product' => $product
        ], 200);
    }

    public function updateProduct(Request $request, $id){
        $product = Product::find($id);

        $product->name = $request->name;
        $product->description = $request->description;

        if($product->image != $request->image){
            $strpos = strpos($request->image, ';');
            $sub = substr($request->image, 0, $strpos);
            $ex = explode('/', $sub)[1];
            $name = time().'.'.$ex;
            $img = Image::make($request->image)->resize(117, 100);
            $upload_path = public_path()."/upload/";
            $photo = $upload_path. $product->image;
            $img->save($upload_path.$name);             
            if(file_exists($photo)){
                @unlink($photo);
            }
        }else{
            $name = $product->image;
        }
        $product->image = $name;
        $product->type = $request->type;
        $product->stock = $request->stock;
        $product->price = $request->price;
        $product->save();
    }

    public function deleteProduct($id){
        $product = Product::findOrFail($id);

        $image_path = public_path().'/upload/';
        $image = $image_path. $product->image;
        if (file_exists($image)){
            @unlink($image);
        }
        $product->delete();
    }
}
