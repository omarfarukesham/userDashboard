import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CustomiseUser = () => {
    const [users, setUsers] = useState([])
    const [modalhandler, setModalHander] = useState({})

    //data retrive hooks from database for table user ..................................
    useEffect(() => {
        fetch('https://serene-headland-23680.herokuapp.com/master')
            .then(res => res.json())
            .then(data => setUsers(data.slice(0, 50)))

    }, [])
    //update handler user data start here..............................................

    //update items handler code here......................................................
    const updateHandler = (e) => {
        e.preventDefault();
        const Nmae = e.target.name.value;
        const img = e.target.Image.value;
        const Country = e.target.Country.value;
        const gender = e.target.Gender.value;
        const Device = e.target.Device.value;
        const Profession = e.target.Profession.value;
        const dailyUse = e.target.dailyUse.value;
        const Invest = e.target.Invest.value;

        const data = { Nmae, img, Country, gender, Device, Profession, dailyUse, Invest };
        console.log(data);

        fetch(
            `https://serene-headland-23680.herokuapp.com/updateMaster/${modalhandler._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                const newUser = [...users, result];
                setUsers(newUser);
                toast.success("User Update successfully")

            });
    };
    //update handler user data end here.................................................


    //collect data from form and send it to server then mongodb start here .................
    const handleSubmit = (e) => {
        e.preventDefault();
        const Nmae = e.target.name.value;
        const img = e.target.Image.value;
        const Country = e.target.Country.value;
        const gender = e.target.Gender.value;
        const Device = e.target.Device.value;
        const Profession = e.target.Profession.value;
        const dailyUse = e.target.dailyUse.value;
        const Invest = e.target.Invest.value;

        const data = { Nmae, img, Country, gender, Device, Profession, dailyUse, Invest };

        fetch("https://serene-headland-23680.herokuapp.com/master", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                const newUser = [...users, result];
                setUsers(newUser);
                toast.success("User data insert successfully");
                e.target.reset();
            });
    };
    //collect data from form and send it to server then mongodb end here ...................

    //Remove data from table and database start here .......................................
    const deleteUser = (id) => {
        const proceed = window.confirm("Are you sure for Remove .........");
        if (proceed) {
            const url = ` https://serene-headland-23680.herokuapp.com/removeMaster/${id}`;
            fetch(url, {
                method: "delete",
            })
                .then((res) => res.json())
                .then((data) => {
                    const remaining = users.filter((prod) => prod._id !== id);
                    setUsers(remaining);
                    toast("Data has delete successfully")
                });
        }
    }
    //Remove data from table and database end here ........................................



    return (
        <div>
            {/* New user add section start here  */}
            <div>
                <h3 className="text-center">Add Users</h3>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div class=" card-body form-control w-96 mx-auto bg-base-200">
                            <input type="text" name="name" placeholder="Name" required class="input input-bordered" />
                            <input type="text" name="Country" placeholder="Country" required class="input input-bordered" />
                            <input type="url" name="Image" placeholder="Image url" required class="input input-bordered" />
                            <select name="Gender" required class="select select-info w-full max-w-xs">
                                <option disabled selected>Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            <select name="Device" class="select select-info w-full max-w-xs">
                                <option disabled selected>Device</option>
                                <option>2XL</option>
                                <option>XL</option>
                            </select>
                            <select name='dailyUse' required class="select select-info w-full max-w-xs">
                                <option disabled selected>DailY Use</option>
                                <option>true</option>
                                <option>false</option>
                            </select>
                            <input type="text" required name="Profession" placeholder="Profession" class="input input-bordered" />
                            <input type="number" name="Invest" placeholder="Invest" class="input input-bordered" />
                            <button type="submit" class="btn btn-outline btn-primary">ADD USER</button>
                        </div>

                    </form>
                </div>
            </div>
            {/* New user add section end here  */}

            {/* User data showing section start here  */}
            <div className='m-5 bg-base-200'>
                <h1 className='text-center text-2xl font-bold text-primary'>Data is showing 10000 of {users.length}</h1>
                <div class="overflow-x-auto w-full">
                    <table class="table w-full">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Profession</th>
                                <th>Country </th>
                                <th>Gender</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                users.map(user => <>
                                    <tr key={user._id}>
                                        <td>
                                            <div class="avatar online">
                                                <div class="w-12 rounded-full">
                                                    <img src={user.img} alt="userImag" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p>{user?.Nmae}</p>
                                        </td>
                                        <td>{user?.Profession}</td>
                                        <td>{user?.Country}</td>
                                        <td>{user?.gender}</td>
                                        <td>
                                            <label onClick={() => setModalHander(user)} for="my-modal-6" class="btn btn-primary btn-xs modal-button text-white mx-2">Edit</label>
                                            <button onClick={() => deleteUser(user._id)} className='btn btn-error btn-xs text-white'>Delete</button>
                                        </td>

                                    </tr>
                                </>)
                            }

                        </tbody>


                    </table>
                </div>
            </div>

            {/* User data showing section end here  */}

            {/* Modal for edit data start here  */}
            <div>
                <input type="checkbox" id="my-modal-6" class="modal-toggle" />
                <div class="modal modal-bottom sm:modal-middle">
                    <div class="modal-box">
                        <figure><img src={modalhandler?.img} alt="Shoes" /></figure>
                        <form onSubmit={updateHandler}>
                            <div class=" card-body form-control w-96 mx-auto bg-base-200">
                                <input type="text" name="name" placeholder={modalhandler.Nmae} required class="input input-bordered" />
                                <input type="text" name="Country" placeholder={modalhandler.Country} required class="input input-bordered" />
                                <input type="url" name="Image" placeholder="New Url" required class="input input-bordered" />
                                <select name="Gender" required class="select select-info w-full max-w-xs">
                                    <option disabled selected>Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                                <select name="Device" class="select select-info w-full max-w-xs">
                                    <option disabled selected>Device</option>
                                    <option>2XL</option>
                                    <option>XL</option>
                                </select>
                                <select name='dailyUse' required class="select select-info w-full max-w-xs">
                                    <option disabled selected>DailY Use</option>
                                    <option>true</option>
                                    <option>false</option>
                                </select>
                                <input type="text" required name="Profession" placeholder={modalhandler.Profession} class="input input-bordered" />
                                <input type="number" name="Invest" placeholder="Invest" class="input input-bordered" />
                                <button type="submit" class="btn btn-outline btn-primary">Edit USER</button>
                            </div>

                        </form>

                        <div class="modal-action">
                            <label for="my-modal-6" class="btn">Close!</label>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal for edit data end here  */}
        </div>
    );
};

export default CustomiseUser;

