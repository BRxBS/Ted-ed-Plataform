import { gql, useMutation } from "@apollo/client"
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { LogoEd } from "../components/LogoEd";

const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscriber($name: String!, $email: String!) {
    createSubscriber(data: { name: $name, email: $email }) {
      id
    }
  }
`;

export function Subscribe() {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState("");

    const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBER_MUTATION);

    async function handleSubscribe(event: FormEvent){
        event.preventDefault();

        await createSubscriber({
            variables: {
                name,
                email,
            }
        })
        navigate('/event')
    }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat block md:flex flex-col items-center">
      <div className="md:w-[1100px] md:max-h-[1100px] block md:flex items-center justify-center  md:justify-between mt-20 mx-auto">
        <div className="md:max-w-[640px] justify-center ">
          <div className="flex items-center justify-center md:block">
            <LogoEd />
          </div>
          <h1 className="mt-8 text-2xl md:text-[2.5rem] leading-tight justify-center px-4 py-2 ">
            Learn about
            <strong className="text-red-600"> coronavirus </strong>, how
            <strong className="text-red-600"> vaccines </strong> work and how
            your body fights
            <strong className="text-red-600"> viruses</strong>.
          </h1>

          <p className="mt-8 text-sm md:text-2xl text-gray-200 leading-relaxed px-4 py-2">
            With this sequence of videos you will learn about your body, immune
            system, about the stages of a pandemic and much more, guarantee your
            registration.
          </p>
        </div>

        <div className="w-11/12 h-80 p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">Sign-up for free</strong>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col gap-2" //width of the form
          >
            <input
              className="bg-gray-500 rounded px-5 h-14"
              type="text"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="bg-gray-500 rounded px-5 h-14"
              type="email"
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-red-600 uppercase py-4 rounded font-bold text-sm hover:bg-red-700 transition-colors disabled::opacity-50"
            >
              Secure my spot
            </button>
          </form>
        </div>
      </div>

      <img src="/src/assets/Group.png" alt="" className="mt-4" />
    </div>
  );
}
