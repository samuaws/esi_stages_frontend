<template>
  <div class="everything">
      <NavBar />
      <div class="chart-container" style="position: relative; height:40vh; width:80vw">
      <canvas id="planet-chart" responsive ></canvas>
      </div>
  </div>
</template>

<script>
 import NavBar from '../components/NavBar.vue'
 
import Chart from 'chart.js'
import axios from 'axios'
  export default {
     
      components : {
       NavBar
                  },
 data(){
     return {
      dataChart1 : {
            type: "line",
       data: {
      labels: [],
      datasets: []
    },
    options: {
      responsive: true,
      lineTension: 1,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              padding: 25
            }
          }
        ]
      }
    }
      },
      entreprise : [],
      datasets1 : [],
      
    }
 },
 mounted() {
    const ctx = document.getElementById('planet-chart');
    new Chart(ctx, this.dataChart1);
    
  },
  async created(){
     const stages = await axios.get("/stage/PFE");
     const y = await axios.get("/stage/annee")
     const h = await axios.get("/entreprise");
      for (var ent of h.data)
      {
          this.entreprise.push(ent.name);
      
      }
       this.dataChart1.data.labels = this.entreprise
       let le = this.entreprise.length;
      //var cmp = new Array(le);
       var D = new Array(100);
    //    for(var i=0;i<le;++i) {cmp[i] = 0}
      //  D[2021]=[0,0,0,0,0];
      //  D[2022]=[0,0,0,0,0];
       console.log(D[2021])
    for(var s of stages.data){
            var ind = this.dataChart1.data.labels.indexOf(s.entreprise.name);
            if(D[s.annee%2000]==undefined){
              D[s.annee%2000]=[];
               for(var i=0;i<le;i++) {D[s.annee%2000][i]= 0;}
              console.log(D[s.annee%2000])
            }
            // for(var j=0;s.annee!=this.dataset1[j].label;j++){ console.log(j) }
            D[s.annee%2000][ind]=D[s.annee%2000][ind]+1;
            
            // this.datasets1[1].data[ind]=1;
            // console.log(this.datasets1[1].data[ind]);
            // console.log(this.datasets1[0].data[ind]);
            // this.datasets1[0].data[ind]= this.datasets1[0].data[ind] + 1;            
      }
    for (var f of y.data){
        this.datasets1.push(
         {
          label:  f.toString(),
          data: D[f%2000],
          backgroundColor: `rgba(${Math.random()*100},${Math.random()*100},${Math.random()*100},.5)`,
          borderColor: "#36495d",
          borderWidth: 3
        } ) }
    this.dataChart1.data.datasets = this.datasets1
    // console.log(this.datasets1[1].data[3]);
    // console.log(this.dataChart1.data.datasets);
  },

  

}
</script>

<style>

</style>