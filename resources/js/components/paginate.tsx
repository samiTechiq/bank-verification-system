import { cn } from '@/lib/utils';
import { Links } from '@/types';
import { Link } from '@inertiajs/react';

interface Props {
    links: Links[];
}

export default function Paginate({ links }: Props) {
    // Filter out empty labels (sometimes provided by Laravel pagination)
    const filteredLinks = links.filter((link) => link.label !== '');

    // Helper function to clean HTML entities from labels
    const cleanLabel = (label: string) => {
        const withoutEntities = label.replace(/&laquo;/g, '←').replace(/&raquo;/g, '→');
        // If it's a number or arrow, return as is
        if (/^[0-9←→]$/.test(withoutEntities)) {
            return withoutEntities;
        }
        // For "Previous" and "Next" on mobile, return arrow only
        return withoutEntities === '←' ? '←' : withoutEntities === '→' ? '→' : withoutEntities;
    };

    return (
        <nav className="flex items-center justify-between px-2 py-3">
            {/* Mobile Previous/Next only */}
            <div className="flex flex-1 justify-between md:hidden">
                {filteredLinks.find((link) => link.label.includes('Previous')) ? (
                    <Link
                        href={filteredLinks[0]?.url ?? ''}
                        className={cn(
                            'relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium',
                            !filteredLinks[0]?.url ? 'pointer-events-none bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50',
                            'border border-gray-300',
                        )}
                        preserveScroll
                    >
                        Previous
                    </Link>
                ) : (
                    <div /> // Empty div for spacing
                )}

                {filteredLinks.find((link) => link.label.includes('Next')) ? (
                    <Link
                        href={filteredLinks[filteredLinks.length - 1]?.url ?? ''}
                        className={cn(
                            'relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium',
                            !filteredLinks[filteredLinks.length - 1]?.url
                                ? 'pointer-events-none bg-gray-100 text-gray-400'
                                : 'bg-white text-gray-700 hover:bg-gray-50',
                            'border border-gray-300',
                        )}
                        preserveScroll
                    >
                        Next
                    </Link>
                ) : (
                    <div /> // Empty div for spacing
                )}
            </div>

            {/* Desktop full pagination */}
            <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
                <div className="flex gap-1">
                    {filteredLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link?.url ?? ''}
                            className={cn(
                                'relative inline-flex min-w-[2.5rem] items-center justify-center rounded-md border px-3 py-2 text-sm font-medium',
                                !link.url
                                    ? 'pointer-events-none border-gray-200 bg-gray-100 text-gray-400'
                                    : link.active
                                      ? 'bg-primary border-primary hover:bg-primary/90 z-10 text-white'
                                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
                                'transition-colors duration-200',
                            )}
                            preserveScroll
                        >
                            <span
                                className="hidden md:inline"
                                dangerouslySetInnerHTML={{
                                    __html: cleanLabel(link.label),
                                }}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
