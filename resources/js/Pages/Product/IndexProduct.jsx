import { Head, Link, router } from "@inertiajs/react";
import AppLayout from "../Layouts/AppLayout";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function IndexProduct({ products }) {

    const [loading, setLoading] = useState(true); // State untuk loading
    const [error, setError] = useState(null); // State untuk menangani error
    const [data, setValues] = useState({
        search: "",
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSearch(e) {
        e.preventDefault();
        router.get("/products", data, { preserveState: true, preserveScroll: true });
    }

    useEffect(() => {}, []); // Jalankan sekali saat komponen dirender

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

    function deleteConfirm(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this! your id is ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete("/products/" + id, {
                    onSuccess: (page) => {
                        Toast.fire({
                            icon: "success",
                            // title: "Deleted!",
                            text: "Data berhasil dihapus.",
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
        });
    }

    return (
        <>
            <AppLayout headerContent="Product List">
                <Head title="Products" />
                <div className="border border-base-100 rounded-md p-2">
                    <div className="flex justify-end">
                        <Link
                            href="products/create"
                            className="btn btn-sm btn-success"
                        >
                            Add Product
                        </Link>
                    </div>
                    
                    <div className="join min-w-full my-2">
                        <div className="w-full">
                            <div className="w-full">
                                <input
                                    className="input-bordered w-full text-xs input-sm join-item"
                                    placeholder="Search name,category,brand"
                                    id="search"
                                    value={data.search}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="indicator">
                            <form action="" onSubmit={handleSearch}>
                                <button type="submit" className="btn btn-sm join-item">Search</button>
                            </form>
                        </div>
                    </div>

                    <div className="mt-2">
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr className="uppercase font-semibold">
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Brand</th>
                                        <td>Price</td>
                                        <th>Stock</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}

                                    {products.map((item) => (
                                        <>
                                            <tr key={item._id}>
                                                <th>
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src={ item.thumbnail }
                                                                alt={item.title}
                                                            />
                                                        </div>
                                                    </div>
                                                </th>
                                                <td>{item.title}</td>
                                                <td>{item.category}</td>
                                                <td>{item.brand}</td>
                                                <td>{item.price}</td>
                                                <td>{item.stock}</td>
                                                <th>
                                                    <Link
                                                        href={
                                                            "/products/" +
                                                            item._id +
                                                            "/edit"
                                                        }
                                                        className="btn btn-primary btn-sm"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        className="btn btn-error btn-sm"
                                                        onClick={() =>
                                                            deleteConfirm(
                                                                item._id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </th>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>Total : {products.total} Item</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
