import { Link, Head, usePage, router } from "@inertiajs/react";
import AppLayout from "../Layouts/AppLayout";
import { useState, useEffect } from "react";
import FormGroup from "../Components/FormInput";
import FormTextarea from "../Components/FormTextarea";
import Swal from "sweetalert2";

export default function FormProduct({ product }) {
    const { errors } = usePage().props;

    const [formData, setFormData] = useState({
        title: product?.title,
        description: product?.description,
        category: product?.category,
        price: product?.price ?? 0,
        discountPercentage: product?.discountPercentage ?? 0,
        rating: product?.rating ?? 0,
        stock: product?.stock ?? 0,
        brand: product?.brand,
        sku: product?.sku,
        weight: product?.weight,
        warrantyInformation: product?.warrantyInformation,
        shippingInformation: product?.shippingInformation,
        availabilityStatus: product?.availabilityStatus,
        returnPolicy: product?.returnPolicy,
        minimumOrderQuantity: product?.minimumOrderQuantity ?? "",
        thumbnail: product?.thumbnail ?? "",
        tags: product?.tags ?? [],
        dimensions: product?.dimensions ?? { width: 0, height: 0, depth: 0 },
        meta: product?.meta ?? { createdAt: "", updatedAt: "", barcode: "", qrCode: "" },
        images: product ? JSON.parse(product.images) : [],
        reviews: product?.reviews ?? [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNestedChange = (e, key) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                [name]: value,
            },
        }));
    };

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (product) {
            router.put("/products/" + product._id, formData, {
                onSuccess: (page) => {
                    Toast.fire({
                        icon: "success",
                        title: "produk berhasil diupdate",
                    });
                },
                onError: (errors) => {
                    Toast.fire({
                        title: "Oops terjadi kesalahan!",
                        icon: "error",
                    });
                },
            })
        } else {
            router.post("/products", formData, {
                onSuccess: (page) => {
                    Toast.fire({
                        icon: "success",
                        title: "produk berhasil ditambahkan",
                    });
                },
                onError: (errors) => {
                    Toast.fire({
                        title: "Oops terjadi kesalahan!",
                        icon: "error",
                    });
                },
            });
        }
    }

    return (
        <>
            <AppLayout headerContent={ product ? "Update Product" : "Add product"}>
                <Head title={ product ? "Update Product" : "Add product"} />
                <div className="border border-gray-100 rounded-md p-2">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="lg:grid lg:grid-cols-3 gap-x-2">
                            <FormGroup
                                label="product name :"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                error={errors.title}
                                required={true}
                                placeholder="Enter product title"
                            />

                            <FormGroup
                                label="Price"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                error={errors.price}
                                required={true}
                                placeholder="Enter product price"
                            />

                            <FormGroup
                                label="Category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                error={errors.category}
                                required={true}
                                placeholder="Enter product category"
                            />

                            <FormGroup
                                label="brand"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                error={errors.brand}
                                required={true}
                                placeholder="Enter product brand"
                            />
                            <FormGroup
                                label="rating"
                                name="rating"
                                type="number"
                                value={formData.rating}
                                onChange={handleChange}
                                error={errors.rating}
                                required={true}
                                placeholder="Enter product rating"
                            />
                            <FormGroup
                                label="stock"
                                name="stock"
                                type="number"
                                value={formData.stock}
                                onChange={handleChange}
                                error={errors.stock}
                                required={true}
                                placeholder="Enter product stock"
                            />

                            <FormGroup
                                label="discountPercentage"
                                name="discountPercentage"
                                type="number"
                                value={formData.discountPercentage}
                                onChange={handleChange}
                                error={errors.discountPercentage}
                                required={false}
                                placeholder="Enter product discountPercentage"
                            />
                            <FormGroup
                                label="sku"
                                name="sku"
                                type="text"
                                value={formData.sku}
                                onChange={handleChange}
                                error={errors.sku}
                                required={false}
                                placeholder="Enter product sku"
                            />
                            <FormGroup
                                label="weight"
                                name="weight"
                                type="number"
                                value={formData.weight}
                                onChange={handleChange}
                                error={errors.weight}
                                required={false}
                                placeholder="Enter product weight"
                            />
                            <FormGroup
                                label="warranty Information"
                                name="warrantyInformation"
                                type="text"
                                value={formData.warrantyInformation}
                                onChange={handleChange}
                                error={errors.warrantyInformation}
                                required={false}
                                placeholder="Enter product warrantyInformation"
                            />
                            <FormGroup
                                label="shipping Information"
                                name="shippingInformation"
                                type="text"
                                value={formData.shippingInformation}
                                onChange={handleChange}
                                error={errors.shippingInformation}
                                required={false}
                                placeholder="Enter product shippingInformation"
                            />
                            <FormGroup
                                label="availability Status"
                                name="availabilityStatus"
                                type="text"
                                value={formData.availabilityStatus}
                                onChange={handleChange}
                                error={errors.availabilityStatus}
                                required={false}
                                placeholder="Enter product availabilityStatus"
                            />
                            <FormGroup
                                label="return Policy"
                                name="returnPolicy"
                                type="text"
                                value={formData.returnPolicy}
                                onChange={handleChange}
                                error={errors.returnPolicy}
                                required={false}
                                placeholder="Enter product returnPolicy"
                            />
                            <FormGroup
                                label="minimumOrderQuantity"
                                name="minimumOrderQuantity"
                                type="text"
                                value={formData.minimumOrderQuantity}
                                onChange={handleChange}
                                error={errors.minimumOrderQuantity}
                                required={false}
                                placeholder="Enter product minimumOrderQuantity"
                            />
                            <FormGroup
                                label="tags"
                                name="tags"
                                type="text"
                                value={formData.tags}
                                onChange={handleChange}
                                error={errors.tags}
                                required={false}
                                placeholder="Enter product tags"
                            />

                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">
                                        Dimension
                                    </span>
                                </div>
                                <div className="flex justify-between space-x-1">
                                    <input
                                        type="number"
                                        name="width"
                                        placeholder="Width"
                                        value={formData.dimensions.width}
                                        onChange={(e) =>
                                            handleNestedChange(e, "dimensions")
                                        }
                                        className="input input-sm input-bordered w-full"
                                    />
                                    <input
                                        type="number"
                                        name="height"
                                        placeholder="Height"
                                        value={formData.dimensions.height}
                                        onChange={(e) =>
                                            handleNestedChange(e, "dimensions")
                                        }
                                        className="input input-sm input-bordered w-full"
                                    />
                                    <input
                                        type="number"
                                        name="depth"
                                        placeholder="Depth"
                                        value={formData.dimensions.depth}
                                        onChange={(e) =>
                                            handleNestedChange(e, "dimensions")
                                        }
                                        className="input input-sm input-bordered w-full"
                                    />
                                </div>
                                <div className="label">
                                    <span className="label-text-alt">
                                        error
                                    </span>
                                </div>
                            </label>

                            <FormGroup
                                label="thumbnail"
                                name="thumbnail"
                                type="file"
                                value={formData.thumbnail}
                                onChange={handleChange}
                                error={errors.thumbnail}
                                required={true}
                            />

                            <FormTextarea
                                label="description"
                                value={formData.description}
                                onChange={handleChange}
                                id="description"
                                name="description"
                                error={errors.description}
                            />
                        </div>

                        <div className="flex justify-between w-full">
                            <button
                                type="submit"
                                className="btn btn-sm btn-primary"
                            >
                                Submit
                            </button>
                            <Link
                                href="/products"
                                className="btn btn-sm btn-secondary"
                            >
                                Back
                            </Link>
                        </div>
                    </form>
                </div>
            </AppLayout>
        </>
    );
}
