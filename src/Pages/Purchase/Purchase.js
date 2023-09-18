import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";

const Purchase = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const [displayError, setDisplayError] = useState("");
  const [skipSteps, setSkipSteps] = useState(1);
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: tool, isLoading } = useQuery("purchasingTool", () =>
    fetch(`https://craft-owl-server.vercel.app/tool/${id}`).then((res) =>
      res.json()
    )
  );

  // setting initial value for quantity state
  useEffect(() => {
    setQuantity(parseInt(tool?.minimumOrderQuantity));
  }, [tool]);

  // handling errors based on quantity range
  useEffect(() => {
    if (quantity < tool?.minimumOrderQuantity) {
      setDisplayError("You have to Order more than Minimum Order Quantity");
    } else if (quantity > tool?.availableQuantity) {
      setDisplayError("You have to Order below Available Quantity");
    } else {
      setDisplayError("");
    }
  }, [quantity, tool]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  const {
    name,
    image,
    description,
    minimumOrderQuantity,
    availableQuantity,
    price,
  } = tool;

  // handler for submit the order
  const onSubmit = (data) => {
    const orderInfo = {
      person: user?.displayName,
      email: user?.email,
      toolName: name,
      totalPrice: parseFloat(price * quantity),
      quantity: quantity,
      phone: data.phone,
      address: data.address,
      status: "unpaid",
    };
    fetch("https://craft-owl-server.vercel.app/order", {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      method: "POST",
      body: JSON.stringify(orderInfo),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          navigate("/");
          signOut(auth);
        } else {
          return res.json();
        }
      })
      .then((result) => {
        if (result.acknowledged) {
          navigate("/dashboard/my-orders");
          toast.success("To Confirm Your Order Complete the Payment", {
            id: "purchaseSuccess",
          });
        }
      });
  };

  // handler for skipping quantities
  const handleSkipQuantitySteps = (e) => {
    setSkipSteps(parseInt(e.target.value));
  };

  // handler for increasing quantities
  const handleIncreaseQuantity = () => {
    setQuantity((previousQuantity) => previousQuantity + skipSteps);
  };

  // handler for decreasing quantities
  const handleDecreaseQuantity = () => {
    setQuantity((previousQuantity) => previousQuantity - skipSteps);
  };

  return (
    <div className="mt-48 grid grid-cols-1 lg:grid-cols-5">
      <div className="card md:card-side bg-base-100 shadow-xl lg:col-span-3 p-4">
        <figure>
          <img
            className="h-48 rounded-lg md:rounded-l-lg md:rounded-r-none md:h-full w-60"
            src={image}
            alt="Album"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-3xl">{name}</h2>
          <p className="text-gray-600" title={description}>
            {description.length > 60
              ? description.slice(0, 60) + "..."
              : description}
          </p>
          <p className="text-2xl">
            $ <span className="text-secondary font-semibold">{price}</span>
          </p>
          <p>
            Minimum Order Quantity:{" "}
            <span className="text-secondary font-semibold">
              {minimumOrderQuantity}
            </span>
          </p>
          <p>
            Available Quantity:{" "}
            <span className="text-secondary font-semibold">
              {availableQuantity}
            </span>
          </p>
          {/* Quantity managing section  */}
          <div>
            <span className="mr-2 text-xl">Quantity:</span>
            <button
              onClick={handleDecreaseQuantity}
              disabled={quantity <= minimumOrderQuantity}
              className="btn btn-sm btn-secondary mr-2 font-bold"
            >
              <FaMinus />
            </button>
            <input
              type="number"
              name="quantity"
              className="border border-primary rounded w-24 p-1"
              value={quantity || ""}
              disabled
            />
            <button
              onClick={handleIncreaseQuantity}
              disabled={quantity >= availableQuantity}
              className="btn btn-sm btn-secondary mx-2 font-bold"
            >
              <BsPlusLg />
            </button>
            <select onChange={handleSkipQuantitySteps}>
              <option disabled selected>
                Skip
              </option>
              <option value="1">1</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="500">500</option>
            </select>
          </div>
          <p className="text-error h-10">{displayError ? displayError : ""}</p>
        </div>
      </div>
      {/* form starts from here  */}
      <div className="card-body col-span-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name  */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg">Name</span>
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              disabled
              className="input input-bordered text-lg"
            />
          </div>
          {/* Email  */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg">Email</span>
            </label>
            <input
              type="text"
              value={user?.email || ""}
              disabled
              className="input input-bordered text-lg"
            />
          </div>
          {/* phone number  */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg">Phone</span>
            </label>
            <input
              {...register("phone", {
                required: {
                  value: true,
                  message: "Phone Number is Required",
                },
              })}
              type="text"
              placeholder="phone"
              name="phone"
              className="input input-bordered text-lg"
            />

            {errors.phone?.type === "required" && (
              <small className="text-red-500">{errors.phone.message}</small>
            )}
          </div>
          {/* address  */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg">Address</span>
            </label>
            <input
              {...register("address", {
                required: {
                  value: true,
                  message: "Address is Required",
                },
              })}
              type="text"
              placeholder="address"
              name="address"
              className="input input-bordered text-lg"
            />

            {errors.address?.type === "required" && (
              <small className="text-red-500">{errors.address.message}</small>
            )}
          </div>
          {/* submit button  */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={displayError}
            >
              Complete Purchase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Purchase;
