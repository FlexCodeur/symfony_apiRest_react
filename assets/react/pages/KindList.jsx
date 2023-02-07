import React from "react";
import Kinds from '../components/Kinds'
import Navbar from '../components/Navbar'

const KindList = () => {
  return (
    <div>
      <Navbar />
      <section className="books">
        <Kinds />
      </section>
    </div>
  );
}

export default KindList;
