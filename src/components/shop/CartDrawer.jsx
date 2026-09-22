import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

import PerfumeArt from "../common/PerfumeArt";

const CartDrawer = ({
  open,
  cart,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  if (!open) return null;

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      className="
        fixed
        inset-0
        z-[120]
        bg-[#2d2d2d]/45
        backdrop-blur-[2px]
      "
      onClick={onClose}
    >
      <aside
        onClick={(event) => event.stopPropagation()}
        className="
          absolute
          right-0
          top-0
          flex
          h-full
          w-full
          max-w-[460px]
          flex-col
          border-l-[3px]
          border-[#2d2d2d]
          bg-[#fdfbf7]
          shadow-[-8px_0_0_#2d2d2d]
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            border-b-[3px]
            border-dashed
            border-[#2d2d2d]/25
            p-5
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <ShoppingBag />

            <h2
              className="
                font-heading
                text-3xl
                font-bold
              "
            >
              Your bag
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-10
              w-10
              cursor-pointer
              items-center
              justify-center
              rounded-full
              border-2
              border-[#2d2d2d]
            "
          >
            <X size={18} />
          </button>
        </div>

        <div
          className="
            flex-1
            overflow-y-auto
            p-5
          "
        >
          {cart.length === 0 ? (
            <div
              className="
                flex
                h-full
                flex-col
                items-center
                justify-center
                text-center
              "
            >
              <ShoppingBag size={48} strokeWidth={1.5} />

              <h3
                className="
                  mt-5
                  font-heading
                  text-3xl
                  font-bold
                "
              >
                Your bag smells empty.
              </h3>

              <p className="mt-2 text-lg text-[#2d2d2d]/65">
                Pick something unforgettable.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.map((item) => (
                <div
                  key={item.cartId || item.id}
                  className="
                    wobbly-md
                    grid
                    grid-cols-[76px_1fr]
                    gap-3
                    border-2
                    border-[#2d2d2d]
                    bg-white
                    p-3
                    items-center
                  "
                >
                  <div className="h-[76px] w-[76px] overflow-hidden rounded-xl border-2 border-[#2d2d2d] bg-[#fdfbf7] shadow-sm">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-[#2d5da1]">
                        {item.brand}
                      </p>
                      <span className="text-[11px] font-bold bg-[#fff3a8] border border-[#2d2d2d] px-1.5 py-0.2 rounded">
                        {item.size || "100 ml"}
                      </span>
                    </div>

                    <h3
                      className="
                        font-heading
                        text-lg
                        font-bold
                        leading-tight
                      "
                    >
                      {item.name}
                    </h3>

                    <p className="mt-0.5 font-bold text-sm">{formatPrice(item.price)}</p>

                    <div
                      className="
                        mt-3
                        flex
                        items-center
                        justify-between
                        gap-2
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >
                        <button
                          type="button"
                          onClick={() => onDecrease(item.id)}
                          className="
                            flex
                            h-8
                            w-8
                            cursor-pointer
                            items-center
                            justify-center
                            rounded-full
                            border-2
                            border-[#2d2d2d]
                          "
                        >
                          <Minus size={14} />
                        </button>

                        <span className="font-bold">{item.quantity}</span>

                        <button
                          type="button"
                          onClick={() => onIncrease(item.id)}
                          className="
                            flex
                            h-8
                            w-8
                            cursor-pointer
                            items-center
                            justify-center
                            rounded-full
                            border-2
                            border-[#2d2d2d]
                          "
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        className="
                          cursor-pointer
                          text-[#ff4d4d]
                        "
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div
            className="
              border-t-[3px]
              border-dashed
              border-[#2d2d2d]/25
              p-5
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                text-xl
                font-bold
              "
            >
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <button
              type="button"
              className="
                wobbly
                mt-5
                min-h-[52px]
                w-full
                cursor-pointer
                border-[3px]
                border-[#2d2d2d]
                bg-[#ff4d4d]
                px-6
                font-bold
                text-white
                shadow-[5px_5px_0_#2d2d2d]
              "
            >
              Checkout UI
            </button>

            <p
              className="
                mt-3
                text-center
                text-sm
                text-[#2d2d2d]/55
              "
            >
              Frontend demo — no payment will be processed.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
