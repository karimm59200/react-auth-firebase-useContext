import { useContext, useRef, useState,  } from 'react';
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function SignInModal() {
    const { modal, toggleModal, signIn } = useContext(UserContext);
    const inputs = useRef([]);
    const [validation, setValidation] = useState("");
    const formRef = useRef();
    const navigate = useNavigate();  // Correct hook

    const addInput = (element) => {
        if (element && !inputs.current.includes(element)) {
            inputs.current.push(element);
        }
    }

    const closeModal = () => {
        setValidation("");
        toggleModal("close");
    }

    const handleForm = async (e) => {
        e.preventDefault();

        try {
             await signIn(
                inputs.current[0].value,
                inputs.current[1].value
            )
            formRef.current.reset();
            setValidation("");
            navigate("/private/private-home");  // Correct usage
            closeModal();
        }
        catch  {
            setValidation("Email or password incorrect");
            formRef.current.reset();
        }
    }

    return (
        <>
            {modal.signInModal && (
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-10 px-4 pb-20 text-center sm:block sm:p-0">
                        <div onClick={closeModal} className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                            Sign Up
                                        </h3>
                                        <button onClick={closeModal} className="absolute top-0 right-0 p-2 m-2 bg-red-500 text-white rounded-full">X</button>
                                        <form ref={formRef} onSubmit={handleForm}>
                                            <div className="mt-2">
                                                <label htmlFor="signInemail" className="form-label text-sm text-gray-500">
                                                    Enter your email to create an account
                                                </label>
                                            </div>
                                            <div className="mt-2">
                                                <input ref={addInput} type="email" name="signInemail" id="signInemail" className="form-control shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Enter your email" required />
                                            </div>
                                            <div className="mt-2">
                                                <label htmlFor="signPwd" className="form-label text-sm text-gray-500">
                                                    Enter your password to create an account
                                                </label>
                                            </div>
                                            <div className="mt-2">
                                                <input ref={addInput} type="password" name="signPwd" id="signPwd" className="form-control shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Enter your password" required />
                                            </div>
                                            <p className="text-red-500 mt-1">{validation}</p>

                                            <button className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                                                Sign Up
                                            </button>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SignInModal;
