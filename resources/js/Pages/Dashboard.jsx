import AppLayout from "./Layouts/AppLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <>
            <AppLayout headerContent="Home">
                <Head title="Home"></Head>
                <div className="hero bg-base-200 min-h-screen">
                    <div className="hero-content text-center">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold">Selamat Datang</h1>
                            <p className="py-6">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit qui, facere, magni fugiat asperiores exercitationem quos sint temporibus, labore eos neque est dolor nostrum totam esse provident sequi ipsum accusantium?
                            </p>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
