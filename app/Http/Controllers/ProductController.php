<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Illuminate\Support\Str;

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
    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required', 'string'],
            'category' => ['required', 'string'],
            'price' => ['required', 'numeric'],
            'discountPresentage' => ['numeric'],
            'rating' => ['numeric'],
            'stock' => ['numeric'],
            'brand' => ['required', 'string'],
            'sku' => ['required', 'string'],
            'warrantyInformation' => ['required', 'string'],
            'shippingInformation' => ['required', 'string'],
            'availabilityStatus' => ['required', 'string'],
            'returnPolicy' => ['required', 'string'],
            'minimumOrderQuantity' => ['required', 'numeric']
        ]);

        $response = Http::accept('application/json')
            ->post("https://api.sugity.kelola.biz/api/product", [
                "products" => [$request->all()]
            ]);

        if ($response->unprocessableEntity()) return "data tidak valid";

        if ($response->ok()) return back()->with(['message' => "data berhasil ditambahkan"]);
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
            return Inertia::render('Product/FormProduct', ['product' => $response['data']]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => ['required', 'string'],
            'category' => ['required', 'string'],
            'price' => ['required', 'numeric'],
            'discountPresentage' => ['numeric'],
            'rating' => ['numeric'],
            'stock' => ['numeric'],
            'brand' => ['required', 'string'],
            'sku' => ['required', 'string'],
            'warrantyInformation' => ['required', 'string'],
            'shippingInformation' => ['required', 'string'],
            'availabilityStatus' => ['required', 'string'],
            'minimumOrderQuantity' => ['required', 'numeric']
        ]);

        $response = Http::accept('application/json')
            ->post('https://api.sugity.kelola.biz/api/product/' . $id, $request->except('id', 'thumbnail_input'));

        if ($response->unprocessableEntity()) return "data tidak valid";

        if ($response->ok()) {
            return redirect('/products');
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
