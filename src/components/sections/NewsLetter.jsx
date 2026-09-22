import { ArrowRight, Mail, Check } from "lucide-react";

import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);

    setEmail("");

    setTimeout(() => {
      setSubscribed(false);
    }, 3500);
  };

  return (
    <section
      id="contact"
      className="
        relative
        overflow-hidden
        px-5
        py-24

        md:px-8

        lg:px-12
        lg:py-32
      "
    >
      {/* ==================================================
          DECORATIVE CIRCLE
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-10
          top-[10%]
          hidden
          h-40
          w-40
          rotate-12
          rounded-full
          border-[3px]
          border-dashed
          border-[#2d2d2d]/15

          lg:block
        "
      />

      {/* ==================================================
          DECORATIVE RED MARK
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-[6%]
          top-[16%]
          hidden
          rotate-12
          font-heading
          text-7xl
          font-bold
          text-[#ff4d4d]/20

          lg:block
        "
      >
        !
      </div>

      <div
        className="
          wobbly-lg
          relative
          mx-auto
          max-w-[1150px]
          overflow-hidden
          border-[3px]
          border-[#2d2d2d]
          bg-[#dce7ff]
          p-7
          shadow-[8px_8px_0_#2d2d2d]

          md:p-10

          lg:p-12
        "
      >
        {/* ==================================================
            PAPER DECORATION
        ================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            -right-12
            -top-12
            h-40
            w-40
            rounded-full
            border-[3px]
            border-dashed
            border-[#2d2d2d]/15
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-6
            left-[44%]
            hidden
            rotate-[-8deg]
            text-5xl
            text-[#2d5da1]/25

            md:block
          "
        >
          ↗
        </div>

        {/* ==================================================
            CONTENT
        ================================================== */}

        <div
          className="
            relative
            z-10
            grid
            items-center
            gap-10

            lg:grid-cols-[1fr_0.85fr]
            lg:gap-14
          "
        >
          {/* ==================================================
              LEFT
          ================================================== */}

          <div>
            <div
              className="
                flex
                h-14
                w-14
                rotate-[-4deg]
                items-center
                justify-center
                rounded-full
                border-[3px]
                border-[#2d2d2d]
                bg-[#fff3a8]
                shadow-[3px_3px_0_#2d2d2d]
              "
            >
              <Mail size={25} strokeWidth={2.4} />
            </div>

            <span
              className="
                mt-7
                inline-block
                rotate-[-1deg]
                border-2
                border-dashed
                border-[#2d2d2d]
                bg-[#fdfbf7]
                px-4
                py-1
                text-[15px]
                font-bold
              "
            >
              ✦ Join the fragrance notes
            </span>

            <h2
              className="
                mt-5
                max-w-[600px]
                font-heading
                text-4xl
                font-bold
                leading-[0.95]
                tracking-[-0.025em]

                sm:text-5xl

                lg:text-6xl
              "
            >
              Notes worth
              <span
                className="
                  relative
                  ml-2
                  inline-block
                "
              >
                opening.
                <span
                  className="
                    absolute
                    -bottom-2
                    left-0
                    h-[4px]
                    w-full
                    rotate-[-2deg]
                    bg-[#ff4d4d]
                  "
                />
              </span>
            </h2>

            <p
              className="
                mt-6
                max-w-xl
                text-[19px]
                leading-relaxed
                text-[#2d2d2d]/70

                sm:text-[21px]
              "
            >
              New arrivals, fragrance stories, scent guides and the occasional
              excuse to add another bottle to your collection.
            </p>

            <div
              className="
                mt-7
                flex
                flex-wrap
                gap-x-6
                gap-y-3
                text-[16px]
                font-bold
              "
            >
              <span className="flex items-center gap-2">
                <Check size={17} className="text-[#2d5da1]" />
                New arrivals
              </span>

              <span className="flex items-center gap-2">
                <Check size={17} className="text-[#2d5da1]" />
                Fragrance stories
              </span>

              <span className="flex items-center gap-2">
                <Check size={17} className="text-[#2d5da1]" />
                Special drops
              </span>
            </div>
          </div>

          {/* ==================================================
              RIGHT - FORM
          ================================================== */}

          <div
            className="
              wobbly-lg
              rotate-[1deg]
              border-[3px]
              border-[#2d2d2d]
              bg-[#fdfbf7]
              p-5
              shadow-[6px_6px_0_#2d2d2d]

              sm:p-7
            "
          >
            {!subscribed ? (
              <>
                <p
                  className="
                    font-heading
                    text-2xl
                    font-bold

                    sm:text-3xl
                  "
                >
                  Leave your email here ↓
                </p>

                <p
                  className="
                    mt-2
                    text-[17px]
                    text-[#2d2d2d]/60
                  "
                >
                  We promise not to smell like spam.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="
                    mt-7
                    space-y-4
                  "
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="your@email.com"
                    className="
                      wobbly
                      min-h-[56px]
                      w-full
                      border-[3px]
                      border-[#2d2d2d]
                      bg-white
                      px-5
                      text-[18px]
                      outline-none
                      transition

                      placeholder:text-[#2d2d2d]/35

                      focus:border-[#2d5da1]
                      focus:ring-4
                      focus:ring-[#2d5da1]/10
                    "
                  />

                  <button
                    type="submit"
                    className="
                      wobbly
                      flex
                      min-h-[54px]
                      w-full
                      cursor-pointer
                      items-center
                      justify-center
                      gap-2
                      border-[3px]
                      border-[#2d2d2d]
                      bg-[#2d2d2d]
                      px-6
                      text-[18px]
                      font-bold
                      text-white
                      shadow-[5px_5px_0_#ff4d4d]
                      transition-all

                      hover:translate-x-[2px]
                      hover:translate-y-[2px]
                      hover:bg-[#ff4d4d]
                      hover:shadow-[2px_2px_0_#2d2d2d]

                      active:translate-x-[5px]
                      active:translate-y-[5px]
                      active:shadow-none
                    "
                  >
                    Subscribe to Perfum
                    <ArrowRight size={19} strokeWidth={2.5} />
                  </button>
                </form>

                <p
                  className="
                    mt-4
                    text-center
                    text-[13px]
                    text-[#2d2d2d]/45
                  "
                >
                  No spam. No boring emails. Unsubscribe whenever you like.
                </p>
              </>
            ) : (
              /* ==================================================
                  SUCCESS STATE
              ================================================== */

              <div
                className="
                  flex
                  min-h-[245px]
                  flex-col
                  items-center
                  justify-center
                  text-center
                "
              >
                <div
                  className="
                    flex
                    h-16
                    w-16
                    rotate-[-4deg]
                    items-center
                    justify-center
                    rounded-full
                    border-[3px]
                    border-[#2d2d2d]
                    bg-[#fff3a8]
                    shadow-[4px_4px_0_#2d2d2d]
                  "
                >
                  <Check size={30} strokeWidth={3} />
                </div>

                <h3
                  className="
                    mt-6
                    font-heading
                    text-3xl
                    font-bold
                  "
                >
                  You're on the list!
                </h3>

                <p
                  className="
                    mt-3
                    max-w-sm
                    text-[18px]
                    text-[#2d2d2d]/65
                  "
                >
                  We'll keep a little fragrance note aside for you.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
