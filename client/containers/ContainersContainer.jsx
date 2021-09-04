import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import { useQuery, gql } from '@apollo/client';
import deleteContainer from "../assets/delete.png";
import stopContainer from "../assets/stop.png";
import restartContainer from "../assets/restart.png";
import DndContainers from "../components/dockerContainer/DndContainers"
import TrashCan from "../components/dockerContainer/TrashCan"


const GET_CONTAINERS = gql`
query containers {
  container(id:10) {
    id
    dockerid
    name
    size
    status
  }
}
`;


const ContainersContainer = (props) => {
  const fakeData = 
      [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
        { id: 4, name: 'Item 4' },
      ]
   
  const [containerData, setContainerData] = useState(fakeData)
//   const GET_CONTAINERS = gql`
//   query containers {
//     container(id:10) {
//       id
//       dockerid
//       name
//       size
//       status
//     }
//   }
// `;
  const { loading, error, data } = useQuery(GET_CONTAINERS);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  // console.log("data:", data)
  // console.log("data here", data.container[0])

  
  const handleDrop = (newValue) => {
    setContainerData(newValue)
  }

  return (
    <div className='dashbaordContainer'>
      
      
    <NavBar />
    <div className='dashbaordData'>
    <div className='dashbaord-header'>Containers</div>
    
    {/* test */}
    <DndContainers listOfContainers={containerData} handleDrop={handleDrop}/>


    {/* Active Containers */}
    <div className="card2">
    <div className='dnd-board'>
          {/* <!-- Card header --> */}
          <div className="card-header">
            {/* <!-- Title --> */}
            <div className="each-container">Please drag your container here to</div>
          </div>
          {/* <!-- Card body --> */}
          <div className="card-body">
            {/* <!-- Chart wrapper --> */}
            <TrashCan containerData={containerData} handleDrop={handleDrop}/>
          </div>
        </div>
    </div>

    {/* Active Containers */}
     <div className="card2">
     <div className='dnd-board'>
        {/* <!-- Card header --> */}
        <div className="card-header">
          {/* <!-- Title --> */}
          <div className="each-container">Active Containers</div>
        </div>
        {/* <!-- Card body --> */}
        <div className="card-body">
          {/* <!-- Chart wrapper --> */}
          {/* <DndContainers listOfContainers={data}/> */}
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default ContainersContainer;

