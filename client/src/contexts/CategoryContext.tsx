import { useContext, useEffect, useState, createContext } from "react";
import axios from "axios";
import { CategoryItem } from "../types";


export const Category = createContext<CategoryItem[] | []>([]);
Category.displayName = 'CategoryContext';

// @ts-ignore
function CategoryContext({ children }) {
    const [categories, setCategories] = useState<CategoryItem[]>([]);

    useEffect(() => {
        axios.get("http://webdev.cs.vt.edu:8080/EmmanuelBookstoreReactTransact/api/categories")
            .then((response) => setCategories(response.data))
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    return (
        <Category.Provider value={categories}>
            {children}
        </Category.Provider>
    );
}

export default CategoryContext;
