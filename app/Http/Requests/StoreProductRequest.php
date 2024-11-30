<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
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
            'minimumOrderQuantity' => ['required', 'numeric'],
            'thumbnail_input' => ['nullable', 'file', 'mimes:jpeg,png,jpg', 'max:2048'],
        ];
    }
}
