import React, { useEffect, useState } from 'react';

const CustomiseUser = () => {
    const [users, setUsers] = useState([])

    //data retrive hooks from database for table user ..................................
    useEffect(()=>{
        fetch('http://localhost:5000/master')
            .then(res => res.json())
            .then(data => setUsers(data.slice(0, 50)))

    },[])



    //collect data from form and send it to server then mongodb start here 
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('hi');
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


        fetch("http://localhost:5000/master", {
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
                alert("User insert successfully");
                e.target.reset();
            });
    };
    //collect data from form and send it to server then mongodb end here 

    return (
        <div>
            {/* New user add section start here  */}
            <div>
                <h3 className="text-center">Add Users</h3>
                <div >


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
                                users.map(user =><>
                                 <tr key={user._id}>
                                <td>
                                    <div class="avatar online">
                                        <div class="w-12 rounded-full">
                                            <img src={user.img}  alt="userImag" />
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
                                    <button className='btn btn-error text-white btn-xs mx-2'>Remove</button>
                                    <button className='btn btn-primary btn-xs text-white'>Edit</button>
                                </td>

                            </tr>
                                </>)
                            }
                          
                        </tbody>


                    </table>
                </div>
            </div>

            {/* User data showing section end here  */}

        </div>
    );
};

export default CustomiseUser;

