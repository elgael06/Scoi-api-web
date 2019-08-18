import React, { useState } from 'react';

import Cavecera from './Cavecera';
import TablaDinamica from './TablaDinamica';

const App = () => {
    //estados
    const [monitores, setMonitores] = useState([]);

    //setTimeout(() => console.clear(), 500);

    //return
   return (<div class="panel panel-default">
       <Cavecera setMonitores={setMonitores} />
       <TablaDinamica monitores={monitores}/>
    </div>);
}

export default App;