<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Redirect;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $response = Http::accept('application/json')->get("https://api.sugity.kelola.biz/api/product");

        $products = collect($response['data']);

        if (request('search')) {
            $products = $products->filter(function ($item) {
                return Str::contains($item['title'], request('search'))
                    || Str::contains($item['category'], request('search'))
                    || Str::contains($item['brand'], request('search'));
            });
        }

        return Inertia::render('Product/IndexProduct', ["products" => $products->values()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Product/FormProduct');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {

        if ($request->file('thumbnail_input')) {
            $path = $request->file('thumbnail_input')->storeAs(
                'thumbnails', // folder name
                $request->file('thumbnail_input')->hashName(), // file name with hash
                'public' // disk
            );

            $request->merge([
                'thumbnail' => "/storage/" . $path,
            ]);
        }

        $request->merge([
            'images' => [],
            'reviews' => [],
        ]);

        $response = Http::accept('application/json')
            ->post("https://api.sugity.kelola.biz/api/product", [
                "products" => [$request->except("thumbnail_input")]
            ]);

        if ($response->failed()) {
            return back()->withErrors('message', 'Oops terjadi kesalahan');
        } else {
            return to_route('products.index');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $response = Http::accept('application/json')->get('https://api.sugity.kelola.biz/api/product/' . $id);

        if ($response->ok()) {
            $product = $response['data'];
            $product["dimensions"] = is_string($product['dimensions']) ? json_decode($product['dimensions']) : $product['dimensions'];
            $product["meta"] = is_string($product["meta"]) ? json_decode($product['meta']) : $product["meta"];
            $product["images"] = is_string($product["images"]) ? json_decode($product['images']) : $product["images"];
            // return $product;
            return Inertia::render('Product/FormProduct', ['product' => $product]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, string $id)
    {

        if ($request->file('thumbnail_input')) {
            $path = $request->file('thumbnail_input')->storeAs(
                'thumbnails', // folder name
                $request->file('thumbnail_input')->hashName(), // file name with hash
                'public' // disk
            );

            $request->merge(['thumbnail' => "/storage/" . $path]);
        }

        $request->merge([
            'images' => [],
            'reviews' => [],
        ]);

        $response = Http::accept('application/json')
            ->post(
                'https://api.sugity.kelola.biz/api/product/' . $id,
                $request->except('_id', 'thumbnail_input', '_method')
            );

        if ($response->failed()) {
            return back();
        } else {
            return to_route('products.index');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Http::accept('application/json')->delete('https://api.sugity.kelola.biz/api/product/' . $id);
    }
}
