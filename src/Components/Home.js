import React, { useEffect, useState } from 'react';

const Home = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {

        fetch('http://localhost:5000/master')
            .then(res => res.json())
            .then(data => setUsers(data.slice(0, 15)))

    }, [])

    return (
        <>


            <h1 className='text-center text-2xl'>User Data = {users.length}</h1>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 p-5'>
                {
                    users.map((pd, index) =>
                        <div key={pd._id} class="card card-compact w-56 bg-base-200 shadow-xl gap-4 m-2">
                            <figure><img src={pd?.img} alt="Shoes" /></figure>
                            <div class="card-body">
                                <h2 class="card-title">User -{pd?.Nmae}</h2>
                                <small className='font-bold text-primary'>Country :{pd?.Country}</small>
                                <p>Device :{pd?.Device }</p>
                                <p>Sex :{pd?.gender}</p>
                                <div class="card-actions justify-around">
                                    <label  class="btn btn-primary  modal-button btn-xs text-white">Details</label>
                                    {/* <button for="my-modal-6" class="btn btn-primary  modal-button btn-xs text-white">Details</button> */}
                                    <button  class="btn btn-error btn-xs text-white">Delete</button>
                                </div>

                            </div>

                        </div>

                    )
                }


            </div>

           
        </>
    );
};

export default Home;