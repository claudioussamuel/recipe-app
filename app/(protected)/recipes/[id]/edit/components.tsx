import { deleteRecipe } from "@/app/lib/recipe-actions";
import { TrashIcon,PlusIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export function UpdateInvoice({ id }: { id: string }) {
    return (
      <Link
      href={`recipes/${id}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <PencilIcon className="w-5" />
      </Link>
    );
  }
  
  export function DeleteInvoice({ id }: { id: string }) {
   
    const deleteRecipeWithId = deleteRecipe.bind(null, id);
    return (
      // <form 
      // onSubmit={deleteRecipeWithId}
      // >
        <button onClick={deleteRecipeWithId} type="submit" className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
       // </form>
    );
  }

  export function CreateInvoice() {
    return (
      <Link
      href={`recipes/create`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <PlusIcon className="w-5" />
      </Link>
    );
  }