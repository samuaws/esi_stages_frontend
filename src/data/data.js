export const planetChartData = {
    type: "line",
    data: {
      labels: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],
      datasets: [
        {
          label: "Number of oosn",
          data: [0, 0, 1, 2, 79, 82, 27, 14],
          backgroundColor: "rgba(54,73,93,.5)",
          borderColor: "#36495d",
          borderWidth: 3
        },
        {
          label: "Planetary Mass (relative to the Sun x 10^-6)",
          data: [0.166, 2.081, 3.003, 0.323, 954.792, 285.886, 43.662, 51.514],
          backgroundColor: "rgba(71, 183,132,.5)",
          borderColor: "#47b784",
          borderWidth: 3
        }
      ]
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
  };
  
  export default planetChartData;
  async created(){
    // const stages = await axios.get("/stage/PFE");
     const h = await axios.get("/entreprise");
         console.log(h.data);
     for (var ent of h.data)
     {
         this.entreprise.push(ent.name);
     
     }
        
      this.dataChart1.data.labels = this.entreprise
      let le = this.entreprise.length;
      var cmp = new Array(le);
      for(var i=0;i<le;++i)
      {cmp[i] = 1}
      
      const y = await axios.get("/stage/annee")
      console.log(y.data);
      for (var f of y.data)
      {
          this.datasets1.push(
              {
         label: f.toString(),
         data: cmp,
         backgroundColor: `rgba(${f/100},73,93,.5)`,
         borderColor: "#36495d",
         borderWidth: 3
       }

          )
      }
      this.dataChart1.data.datasets = this.datasets1
      console.log(this.dataChart1);
 },