"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  onSnapshot,
  query,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
export default function Home() {
  const [items, setItems] = useState([
    // { name: "flour", quantity: 2 },
    // { name: "flour", quantity: 2 },
    // { name: "flour", quantity: 2 },
  ]);
  const [newItem, setNewItem] = useState({ name: "", quantity: "" });

  // Add item to database
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== "" && newItem.price !== "") {
      // setItems([...items, newItem]);
      await addDoc(collection(db, "items"), {
        name: newItem.name.trim(),
        quantity: newItem.quantity,
      });
      setNewItem({ name: "", quantity: "" });
    }
  };
  // Read items from database
  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);
    });
  }, []);

  // Delete items from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };

  // Incrementing the Quantity
  const increaseQuantity = async (id, quantity) => {
    const itemRef = doc(db, "items", id);
    await updateDoc(itemRef, { quantity: quantity + 1 });
  };

  // Decrementing the Quantity
  const decreaseQuantity = async (id, quantity) => {
    const itemRef = doc(db, "items", id);
    if (quantity > 1) {
      await updateDoc(itemRef, { quantity: quantity - 1 });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl p-4 text-center">Pantry Tracker</h1>
        <div className="bg-white p-4 rounded-md">
          <form className="grid grid-cols-3 items-center text-black">
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="col-span-1 p-3 border"
              type="text"
              placeholder="Enter Item"
            />
            <input
              value={newItem.quantity}
              onChange={(e) =>
                setNewItem({ ...newItem, quantity: e.target.value })
              }
              className="col-span-1 p-3 border mx-3"
              type="number"
              placeholder="Quantity"
            />
            <input
              onClick={addItem}
              className="text-grey text- 14px hover:p-3 text-lg cursor-pointer col-span-1 border p-2"
              type="submit"
              placeholder="Submit"
            />
          </form>
          <ul>
            {items.map((item, id) => (
              <li
                key={id}
                className="my-4 w-full flex justify-between bg-slate-950"
              >
                <div className="p-4 w-full flex justify-between text-md">
                  <span className="capitalize text-md">{item.name}</span>
                  <span>{item.quantity}</span>
                </div>
                <button
                  onClick={() => increaseQuantity(item.id, item.quantity)}
                  className="ml-8 p-4 border-l border-slate-900 hover:w-16 tex-md"
                >
                  +
                </button>
                <button
                  onClick={() => decreaseQuantity(item.id, item.quantity)}
                  className="ml-8 p-4 border-l border-slate-900 hover:w-16 text-md"
                >
                  -
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="ml-8 p-4 border-l border-slate-900 hover:w-16 text-center text-md"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
