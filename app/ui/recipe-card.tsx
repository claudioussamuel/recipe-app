
import Link from "next/link";
import { RecipeData } from "../lib/definitions";
import { DeleteInvoice, UpdateInvoice } from "../(protected)/recipes/[id]/edit/components";



export function RecipeCard({
    category,
   // difficulty,
    id,
    ingredients,
    name,
    time,
    url,
    checkedTags,
    instructions,
}: RecipeData) {
 

  return (
    <article className="flex flex-col gap-4 rounded-3xl border bg-background p-2">
      <div className="flex flex-1 flex-row gap-4 md:flex-col">
        <div className="aspect-square w-36 flex-none overflow-hidden rounded-2xl md:w-full">
          <img
            className="h-full w-full object-cover object-center"
            src={url}
            alt={`${name}&apos; Artwork.`}
          />
        </div>
        <div className="w-full overflow-hidden">
          <Link
            href={``}
            className="hover:text-primary dark:text-primary-foreground"
          >
            <h1 className="truncate text-xl font-bold">{name}</h1>
          </Link>
          <Link
            href={`/`}
            className="hover:text-primary dark:text-primary-foreground"
          >
            {/* <p className="truncate text-sm font-semibold">{difficulty}</p> */}
          </Link>
          <div className="text-sm font-semibold">
         { Object.entries(checkedTags).map(([key, value], index) => (
              <Link
                key={index}
                href={`/`}
                className="hover:text-primary dark:text-primary-foreground"
              >
                {index != 0 && ", "}
                {value as string}
              </Link>
            ))}
          </div>
         
         
            <Link
              href={`/recipes/${id}/edit`}
              className="flex flex-row items-center gap-1 p-0 font-bold text-[#1ed760]"
            >
              <UpdateInvoice id={id} />
              Edit Recipe
            </Link>
            <Link
              href={`/`}
              className="flex flex-row items-center gap-1 p-0 font-bold text-[#FF0000]"
            >
              <DeleteInvoice id={id} />
              Delete Recipe
            </Link>
          
        </div>
      </div>
  
    </article>
  );
}
