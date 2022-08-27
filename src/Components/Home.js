import React, { useEffect, useState } from 'react';

const Home = () => {
    const [users, setUsers] = useState([])
    const [sortText, setSortText] = useState('')
    const [modalhandler, setModalHander] = useState({})

    useEffect(() => {

        fetch('http://localhost:5000/master')
            .then(res => res.json())
            .then(data => setUsers(data.slice(0, 100)))

    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/master')
            .then(res => res.json())
            .then(data => {
                if (sortText == '') {
                    // setProduct(data)
                } else if (sortText == 'allUsers') {
                    setUsers(data.slice(0, 100))
                } else if (sortText == 'Male') {
                    const match = data.filter(v => v.gender.includes(sortText))
                    setUsers(match)
                } else if (sortText == 'Female') {
                    const match = data.filter(v => v.gender.includes(sortText))
                    setUsers(match)
                }
                else if (sortText == 'Laptop') {
                    const sortText = '2XL'
                    const match = data.filter(v => v.Device.includes(sortText))
                    setUsers(match)
                }
                else if (sortText == 'Mobile') {
                    const sortText = 'XS'
                    const match = data.filter(v => v.Device.includes(sortText))
                    setUsers(match)
                }
                else if (sortText == 'China') {
                    const match = data.filter(v => v.Country.includes(sortText))
                    setUsers(match)
                }
                else if (sortText == 'Russia') {
                    const match = data.filter(v => v.Country.includes(sortText))
                    setUsers(match)
                }
            })

    }, [sortText])

    const sortHandler = (e) => {
        setSortText(e.target.value)
    }
    
    const deleteUser = (id) => {
        const proceed = window.confirm("Are you sure for Delete .........");
        if (proceed) {
            const url = ` http://localhost:5000/removeMaster/${id}`;
            fetch(url, {
                method: "delete",
            })
                .then((res) => res.json())
                .then((data) => {
                    const remaining = users.filter((prod) => prod._id !== id);
                    setUsers(remaining);

                });
        }
    }
    return (
        <>


            <h1 className='text-center text-2xl font-bold text-primary'>User Data Loaded 10000 of = {users.length}</h1>
            <div className='w-96 mx-auto '>
                <select onChange={sortHandler} class="select select-bordered w-full max-w-xs">
                    <option disabled selected>users</option>
                    <option>allUsers</option>
                    <option >Male</option>
                    <option >Female</option>
                    <option >Laptop</option>
                    <option >Mobile</option>
                    <option>China</option>
                    <option>Russia</option>
                </select>
            </div>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 p-5'>
                {
                    users.map((pd, index) =>
                        <div key={pd._id} class="card card-compact w-56 bg-base-200 shadow-xl gap-4 m-2">
                            <div class="avatar text-center ">
                                <div class="w-24 rounded-full text-center">
                                    <figure><img src={pd?.img} className='bg-white' alt="Shoes" /></figure>
                                </div>
                            </div>



                            <div class="card-body">
                                <h2 class="card-title">User -{pd?.Nmae}</h2>
                                <small className='font-bold text-primary'>Country :{pd?.Country}</small>
                                <p>Device :{
                                    pd?.Device === '2XL' ? 'Laptop' : 'Mobile'
                                }</p>
                                <p>Sex :{pd?.gender}</p>
                                <small>DailyUser :{
                                     pd?.dailyUser 
                                    }</small>
                                <div class="card-actions justify-around">
                                    <label onClick={()=>setModalHander(pd)} for="my-modal-6" class="btn btn-primary  modal-button btn-xs text-white">Details</label>
                                    {/* <button for="my-modal-6" class="btn btn-primary  modal-button btn-xs text-white">Details</button> */}
                                    <button onClick={() => deleteUser(pd._id)} class="btn btn-error btn-xs text-white">Delete</button>
                                </div>

                            </div>

                        </div>

                    )
                }


            </div>
            <div>
            <input type="checkbox" id="my-modal-6" class="modal-toggle" />
                    <div class="modal modal-bottom sm:modal-middle">
                        <div class="modal-box">
                            <figure><img src={modalhandler?.img} alt="Shoes" /></figure>
                            <h3 class="font-bold text-lg">Brand -----{modalhandler?.Country}</h3>
                            <h3 class="font-bold text-lg">Model -----{modalhandler?.Device}</h3>
                            <p class="py-4">Price ------{modalhandler?.Invest}</p>
                       
                            <div class="modal-action">
                                <label for="my-modal-6" class="btn">Close!</label>
                            </div>
                        </div>
                    </div>
            </div>


        </>
    );
};

export default Home;