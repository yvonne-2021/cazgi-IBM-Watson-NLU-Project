import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
        let listOfEmotionArray;
      return (  
        <div>
          {/*You can remove this line and the line below. */}
          
          <table className="table table-bordered">
            <tbody>
            {
                //Write code to use the .map method that you worked on in the Hands-on React lab to extract the emotions
                //listOfEmotionArray = Object.entries(this.props.emotions)
                Object.entries(this.props.emotions).map((emotionObj)=>{ 
                 //console.log(emotionObj[0] + " " + emotionObj[1])
                   return <tr><td>{emotionObj[0]}</td><td> {emotionObj[1]}</td>  </tr>
                } )
                
                
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
