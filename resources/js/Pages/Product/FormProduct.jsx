import { Link, Head, usePage, router } from "@inertiajs/react";
import AppLayout from "../Layouts/AppLayout";
import { useState, useEffect } from "react";
import FormGroup from "../Components/FormInput";
import FormTextarea from "../Components/FormTextarea";
import Swal from "sweetalert2";

export default function FormProduct({ product }) {
    const { errors } = usePage().props;

    const safeJsonParse = (data) => {
        // Cek apakah data sudah berupa objek JSON
        if (typeof data === "object" && data !== null) {
            return data; // Jika sudah JSON, kembalikan langsung
        }

        // Coba parsing jika data berupa string
        if (typeof data === "string") {
            try {
                return JSON.parse(data); // Parsing berhasil
            } catch (e) {
                console.error("Data tidak valid untuk JSON.parse:", e);
                return data; // Jika parsing gagal, kembalikan data asli
            }
        }

        // Jika bukan string atau objek, kembalikan data apa adanya
        return data;
    };
    
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
        tags: product?.tags ?? [],
        dimensions: safeJsonParse(product?.dimensions) ?? {
            width: 0,
            height: 0,
            depth: 0,
        },
        meta: safeJsonParse(product?.meta) ?? {
            createdAt: "",
            updatedAt: "",
            barcode: "",
            qrCode: "",
        },
        images: product ? product.images : [],
        reviews: product?.reviews ?? [],
        thumbnail_input: "",
    });

    const [isVisible, setIsVisible] = useState(false);
    const [preview, setPreview] = useState(null);

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

    // when the thumbnail input changed
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const name = e.target.name;
        if (file) {
            setPreview(URL.createObjectURL(file));
            setFormData((prev) => ({
                ...prev,
                [name]: file,
            }));
        }
    };

    const checkImageExists = (imageUrl, callback) => {
        const img = new Image();
        img.onload = () => callback(true); // image loaded Gambar
        img.onerror = () => callback(false); // image failed to load
        img.src = imageUrl;
    };

    // check thumbnail if edit mode
    if (product) {
        checkImageExists(product.thumbnail, (exists) => {
            if (exists) setIsVisible(true);
        });
    }

    // setup toaster template
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
        // update data
        if (product) {
            formData._method = "put";
            router.post("/products/" + product._id, formData, {
                forceFormData: true,
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
            });
        }
        // add data
        else {
            router.post("/products", formData, {
                forceFormData: true,
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
            <AppLayout
                headerContent={product ? "Update Product" : "Add product"}
            >
                <Head title={product ? "Update Product" : "Add product"} />
                <div className="border border-base-300 rounded-md p-5">
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
                                        {errors.dimensions && (
                                            <p className="label-text-alt text-red-500">
                                                {errors.dimensions}
                                            </p>
                                        )}
                                    </span>
                                </div>
                            </label>

                            <FormTextarea
                                label="description"
                                value={formData.description}
                                onChange={handleChange}
                                id="description"
                                name="description"
                                error={errors.description}
                                className="lg:col-span-2"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 items-center">
                            <FormGroup
                                label={
                                    product
                                        ? "change thumbnail"
                                        : "add thumbnail"
                                }
                                name="thumbnail_input"
                                type="file"
                                onChange={handleFileChange}
                                error={errors.thumbnail_input}
                                required={true}
                            />

                            <div className="avatar max-w-fit shadow-lg">
                                <div className="mask mask-squircle h-28 w-28">
                                    {isVisible && !preview ? (
                                        <>
                                            <img
                                                src={product.thumbnail}
                                                alt=""
                                            />
                                        </>
                                    ) : preview ? (
                                        <>
                                            <img src={preview} alt="Preview" />
                                        </>
                                    ) : (
                                        <>
                                            <img
                                                src="/img-not-available.png"
                                                alt=""
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="divider"></div>

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
