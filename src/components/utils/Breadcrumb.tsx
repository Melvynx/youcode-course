"use client";

import { useIsClient } from "@/hooks/useIsClient";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export const Breadcrumb = () => {
  const _pathname = usePathname();
  const pathname = _pathname.split("/").filter(Boolean);

  const isClient = useIsClient();

  if (!isClient) return;

  return (
    <nav aria-label="Breadcrumb" className="mx-4">
      <ol
        role="list"
        className="text-skin-secondary flex items-center gap-1 text-sm"
      >
        {pathname.map((item, index) => (
          <BreadcrumbItem
            key={index}
            item={item}
            index={index}
            pathname={pathname}
            isPrismaId={isPrismaId}
          />
        ))}
      </ol>
    </nav>
  );
};

const isPrismaId = (id: string): boolean => {
  // Regular expression to match URL-friendly strings of exactly 25 characters.
  const regex = /^[\w-]{25}$/;
  return regex.test(id);
};

const formatId = (id: string): string => {
  if (id.length <= 4) {
    return id;
  }
  return `${id.slice(0, 2)}...${id.slice(-2)}`;
};

type BreadcrumbItemProps = {
  item: string;
  index: number;
  pathname: string[];
  isPrismaId: (id: string) => boolean;
};

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  item,
  index,
  pathname,
  isPrismaId,
}) => {
  return (
    <Fragment key={item}>
      <li>
        <Link
          href={`/${pathname.slice(0, index + 1).join("/")}`}
          className="block text-xs text-muted-foreground transition hover:text-foreground"
        >
          {isPrismaId(item) ? formatId(item) : item}
        </Link>
      </li>
      {index !== pathname.length - 1 && (
        <ChevronRight className="text-muted-foreground" size={16} />
      )}
    </Fragment>
  );
};
