<template>
  <div class="container3" >
  <div class="div-left">
      <h1 class="name"> Pr . kack ben hamouda</h1>
      <ul>
          <li class="att">email : avfhaghagjgh@aahjcahj.com</li>
          <li class="att">domaine : abfhabfjajhakjfh , jakbcjaknjkan</li>
      </ul>
      <h3 class="att"  >Specialist in kicking ass and taking names , also sometimes does coding and stuff, you know , nerd stuff</h3>
  </div>
  <div class="div-right">
      <img class="big" src="../assets/vince-fleming-_THUISs23CI-unsplash 1.png" alt="">
  </div>
      
 </div>
</template>

<script>
export default {
name : "Promoteur",
}
</script>

<style scope>
.name{
  margin-top:5%;
  margin-bottom:20% ;
 font-family: Lexend Deca;
font-style: normal;
  color: #FFFFFF;
  font-size: 48px;
line-height: 72px;
letter-spacing: 0.54em;
}

.att{
margin-bottom: 5%;
 font-family: Lexend Deca;
  font-style: normal;
  font-style: normal;
  color:  #093545;
 font-weight: 500;
font-size: 24px;
line-height: 36px;

}
body{
  background-color : white; 
    background-image : url("../assets/full name.svg") ;
    background-size: cover;
    
       
}
.container3{
    display: flex;
    flex-direction: row;
    width: 100%;
}
.div-left{   
    left: 0;
    width: 50%;
    

}
.div-right{
    margin-top: 10%;
    width: 50%;
    
}
.big{
    width: 22em;
}

</style>