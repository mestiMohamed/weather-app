import { cn } from "@/lib/utils";
import {SearchBar} from "@/components/SearchBar/SearchBar.jsx";


const Hero = ({ className }) => {
    return (
        <section className={cn("relative overflow-hidden py-32", className)}>
            <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
                <img
                    alt="meteo"
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
                    className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
                />
            </div>
            <div className="relative z-10 container">
                <div className="mx-auto flex max-w-5xl flex-col items-center">
                    <div className="flex flex-col items-center gap-6 text-center">
                        <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
                            <img
                                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                                alt="logo"
                                className="h-16"
                            />
                        </div>
                        <div>
                            <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
                                Consultez la météo en temps réel
                            </h1>
                            <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                                Obtenez les prévisions précises et détaillées pour Montpellier ou n'importe quelle autre ville dans le monde en un instant.
                            </p>
                        </div>
                        <div className="w-full mt-5">
                            <SearchBar />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Hero };
