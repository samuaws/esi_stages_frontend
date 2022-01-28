<template>
  <div class="everything">
      <NavBar />
      <div class="chart-container1" style="position: relative; height:40vh; width:80vw">
      <canvas id="planet-chart1"  ></canvas>
      </div>
      <div class="chart-container2" style="position: relative; height:40vh; width:80vw">
      <canvas id="planet-chart2" ></canvas>
      </div>
      <div class="chart-container3" style="position: relative; height:40vh; width:80vw">
      <canvas id="planet-chart3" ></canvas>
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
      dataChart2 : {
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
      dataChart3 : {
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
      datasets2 : [],
      datasets3 : [],
      
    }
 },
 mounted() {
    const ctx = document.getElementById('planet-chart1');
    new Chart(ctx, this.dataChart1);
    const ctx1 = document.getElementById('planet-chart2');
    new Chart(ctx1, this.dataChart2);
    
    const ctx2 = document.getElementById('planet-chart3');
    new Chart(ctx2, this.dataChart3);
    
  },
  async created(){
     const stages = await axios.get("/stage/PFE");
     const y = await axios.get("/stage/annee")
     const h = await axios.get("/entreprise");
      for (var ent of h.data)
      {
          this.entreprise.push(ent.name);
      
      }
      console.log(stages.data);
       this.dataChart1.data.labels = this.entreprise
       let le = this.entreprise.length;
      //var cmp = new Array(le);
       var D = new Array(100);
    //    for(var i=0;i<le;++i) {cmp[i] = 0}
    for(var s of stages.data){
            var ind = this.dataChart1.data.labels.indexOf(s.entreprise.name);
            if(D[s.annee%2000]==undefined){
              D[s.annee%2000]=[];
               for(var i=0;i<le;i++) {D[s.annee%2000][i]= 0;}
            }
            D[s.annee%2000][ind]=D[s.annee%2000][ind]+1;
         
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
  


    // DATACHART2
       const SV = await axios.get("/stage/PFEV");
       console.log(SV);
       this.dataChart2.data.labels = this.entreprise
         var E = new Array(100);
    for(var s1 of SV.data){
            var ind1 = this.dataChart2.data.labels.indexOf(s1.entreprise.name);
            console.log(ind1);
            if(E[s1.annee%2000]==undefined){
              E[s1.annee%2000]=[];
               for(var j=0;j<le;j++) {E[s1.annee%2000][j]= 0;}
              console.log(E[s1.annee%2000])
            }
            E[s1.annee%2000][ind1]=E[s1.annee%2000][ind1]+s1.group.etudiants.length;
            console.log(E[s1.annee%2000][ind1]);        
      }
    for (var k of y.data){
        console.log(k);
        this.datasets2.push(
         {
          label:  k.toString(),
          data: E[k%2000],
          backgroundColor: `rgba(${Math.random()*100},${Math.random()*100},${Math.random()*100},.5)`,
          borderColor: "#36495d",
          borderWidth: 3
        } ) }
    this.dataChart2.data.datasets = this.datasets2
    // DATACHART3
     
       this.dataChart3.data.labels = y.data
       var F = new Array(y.data.length)
       F = []
     // for(var j=0;j<y.data.length;j++) {F.push(0)}
      for(var y1 of y.data){
            
        await axios.get("/stage/ent/"+y1).then((res)=>{
            F.push(res.data.nbe)

        })
      }
      console.log(F);
        this.datasets3.push(
         {
          label: "hhh",
          data: F,
          backgroundColor: `rgba(${Math.random()*100},${Math.random()*100},${Math.random()*100},.5)`,
          borderColor: "#36495d",
          borderWidth: 3
        } ) 
    this.dataChart3.data.datasets = this.datasets3
  },

 


}
</script>

<style>
.chart-container2{
    margin-top:500PX;
}
.chart-container3{
    margin-top:500PX;
}
</style>