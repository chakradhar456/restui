import { useState,useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './SearchBar.css';
const UserData = ({users,programC}) => {
    console.log(users+"  pg  "+programC)
    return (
        <>
        
            {
               
                users.map((curUser) => {
                    const {pbId,name,designation,division,time,date,programCode,punchSlot} = curUser;
                    if (programC && programCode !== programC) {
                        return null;
                      }
                      else{
                        const uniqueKey = uuidv4();
                    return (
                       <>
                        <tr key={uniqueKey}>
                            <td>{pbId}</td>
                            <td>{name}</td>
                            <td>{designation}</td>
                            <td>{division}</td>
                            <td>{time}</td>
                            <td>{date}</td>
                            <td>{punchSlot}</td>
                        </tr>
                                 
                              </>
                   
                    )}
                })
              

            }

            
        </>
    )
}
export default UserData;