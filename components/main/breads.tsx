import Link from "next/link";

export const Breads = ({
  breadCrumbs,
}: {
  breadCrumbs: Array<{
    name: string;
    href: string;
  }>;
}) => {
  return (
    <div className="flex text-gray-500 ">
      {breadCrumbs.map((x, index) => {
        return (
          <div key={index+'breads'} className="flex items-center ">
            <Link href={x.href}>
              <a className=" ">{x.name}</a>
            </Link>
            {index !== breadCrumbs.length - 1 && (
              <span className="mx-2">{'>'}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
