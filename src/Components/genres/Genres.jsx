import React from 'react'
import { useSelector } from 'react-redux'
import "./genres.scss"


function Genres({data}) {

    const {geners} = useSelector((state) => state.home)

  return <div className='genres'>
        {
            data?.map((g) => {
                if(!geners[g]?.name) return;
                return (
                    <div key={g} className="genre">
                        {geners[g]?.name}
                    </div>
                )
            })
        }
    </div>;
  
}

export default Genres