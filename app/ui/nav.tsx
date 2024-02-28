import Link from "next/link";
import { Button } from "./button";
import { signOut } from "../lib/auth";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Nav() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
     setIsMenuOpen(!isMenuOpen);
  };
  return (
    // <header className="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-md">
    //   <div className="mx-auto grid w-full max-w-7xl grid-cols-12 grid-rows-2 flex-col items-center justify-center gap-2 px-4 py-2 md:flex md:flex-row md:justify-start">
    //     <Link
    //       className="col-span-6 col-start-1 row-start-1 pl-4 text-xl font-bold text-primary dark:text-primary-foreground md:p-0"
    //       href="/"
    //     >
    //       Claudcipe
    //     </Link>
    //     <nav className="col-span-12 row-start-2 flex-1">
    //       {/* <ul className="flex flex-row">
    //         <li>
              
    //         <button className="bg-transparent text-blue-700 font-semibold border-transparent rounded ml-4"> Breakfast</button>
           
    //         </li>
    //         <li>
            
    //         <button className="bg-transparent text-blue-700 font-semibold border-transparent rounded ml-2"> Lunch</button>
          
    //         </li>
    //         <li>
              
    //         <button className="bg-transparent text-blue-700 font-semibold border-transparent rounded ml-2"> Dinner</button>
            
    //         </li>
    //         <li>
             
    //         <button className="bg-transparent text-blue-700 font-semibold border-transparent rounded ml-2"> Dessert</button>
              
    //         </li>
    //       </ul> */}
    //     </nav>
        
    //     <div className="col-span-6 col-start-7 row-start-1 flex flex-row items-center justify-end gap-2 ml-2">
        
    //     <Link         
    //       href="/recipes/create"
    //     >
    //     <Button className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl" >Create Recipe</Button>
    //     </Link>

    //     <Button className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"  onClick={signOut} type="submit">Log out</Button>
    //     </div>
    //   </div>
    // </header>



    <nav className="py-5 bg-green-900 sticky top-0 border-b border-gray-100">
      <div className="container md:px-12 md:flex md:items-center md:justify-between">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center">
            <span className="text-2xl text-white font-sans font-bold">Claudcipe</span>
          </a>
          <span className="block mx-2 text-3xl bg-gray-100 p-2 rounded-lg md:hidden">
            

            <Menu onClick={toggleMenu}/>
          </span>
        </div>
        <ul className={`p-5 z-10 absolute  backdrop-blur w-full left-0 py-4 transition-all ease-in duration-500 md:p-0 md:flex md:items-center md:space-x-8 md:static md:w-auto ${isMenuOpen ? 'top-[80px] opacity-100' : 'top-[-400px] opacity-0'} md:top-[80px] md:opacity-100`}>
          <li className="md:my-0">
            <Link href="/" className="font-medium duration-500 md:text-white  text-black">Home</Link>
          </li>
          <li className="my-6 md:my-0">
            <Link href="/" className="font-medium duration-500 md:text-white text-black">Recipes</Link>
          </li>
          <li className="my-6 md:my-0">
            <Link href="/" className="font-medium duration-500 md:text-white text-black">Articles</Link>
          </li>
          <li className="my-6 md:my-0">
            <Link href="/" className="font-medium duration-500 md:text-white text-black">Contact</Link>
          </li>
          <a href="#" type="button" onClick={signOut} className="w-full text-white bg-black font-medium rounded-lg px-2 py-3 text-center hover:bg-indigo-500 hover:drop-shadow-md transition duration-300 ease-in-out">
            Log Out</a>
        </ul>
      </div>
    </nav>
  );
}


{/* <script>
  function Menu(e) {
    let list = document.querySelector("ul");
    e.name === "menu" ? (e.name = "close",list.classList.add('top-[-80px]'),list.classList.add('opacity-100')) : (e.name = "menu",list.classList.remove('top-[80px]'),list.classList.remove('opacity-100'))
  }
</script> */}