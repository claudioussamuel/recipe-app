import Link from "next/link";
import { Button } from "./button";
import { signOut } from "../lib/auth";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-md">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-12 grid-rows-2 flex-col items-center justify-center gap-2 px-4 py-2 md:flex md:flex-row md:justify-start">
        <Link
          className="col-span-6 col-start-1 row-start-1 pl-4 text-xl font-bold text-primary dark:text-primary-foreground md:p-0"
          href="/"
        >
          Claudcipe
        </Link>
        <nav className="col-span-12 row-start-2 flex-1">
          <ul className="flex flex-row">
            <li>
              
            <button className="bg-transparent text-blue-700 font-semibold border-transparent rounded ml-4"> Breakfast</button>
           
            </li>
            <li>
            
            <button className="bg-transparent text-blue-700 font-semibold border-transparent rounded ml-2"> Lunch</button>
          
            </li>
            <li>
              
            <button className="bg-transparent text-blue-700 font-semibold border-transparent rounded ml-2"> Dinner</button>
            
            </li>
            <li>
             
            <button className="bg-transparent text-blue-700 font-semibold border-transparent rounded ml-2"> Dessert</button>
              
            </li>
          </ul>
        </nav>
        <div className="col-span-6 col-start-7 row-start-1 flex flex-row items-center justify-end gap-2 ml-2">
        
        <Link         
          href="/recipes/create"
        >
        <Button>Create Recipe</Button>
        </Link>

        <Button onClick={signOut} type="submit">Log out</Button>
        </div>
      </div>
    </header>
  );
}
