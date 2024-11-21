import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer className="footer footer-center text-base-content p-4">
            <aside>
                <p>
                    Built {new Date().getFullYear()} - by Pramono
                </p>
            </aside>
        </footer>
    );
}
