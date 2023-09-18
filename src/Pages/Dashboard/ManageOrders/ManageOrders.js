import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useQuery } from "react-query";
import auth from "../../../firebase.init";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import DeleteOrderModal from "./DeleteOrderModal";
import Order from "./Order";

const ManageOrders = () => {
  const [deletingOrder, setDeletingOrder] = useState(null);
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery("orders", () =>
    fetch("https://craft-owl-server.vercel.app/admin/order", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
      } else {
        return res.json();
      }
    })
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="flex flex-col gap-6">
      {orders.map((order) => (
        <Order
          key={order._id}
          refetch={refetch}
          order={order}
          setDeletingOrder={setDeletingOrder}
        />
      ))}
      {deletingOrder && (
        <DeleteOrderModal
          deletingOrder={deletingOrder}
          setDeletingOrder={setDeletingOrder}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default ManageOrders;
