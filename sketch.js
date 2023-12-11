var g = 9.82; // tygndekraften, m/s^2
var v0 = 50; // starthastighed, m/s
var angle = Math.PI/4; // vinkel til x-akse, radianer
var rho = 1.3; // massefylde af luft, kg/m3
var A = (Math.PI)*(0.05**2); // planareal tangent med luften, altid en cirkel for en kugle m^2
var C = 0.65; // "drag coefficient" af kugle, enhedsløs, Re > 1000
var m = 1; // masse af kugle, kg
var D = 0.5*rho*C*A; //samlede modstandskoefficient
var dt = 0.0016; // delta tid, trinstørrelse, sekunder
var t = [];
var vx = [];
var vy = [];
var ax = [];
var ay = [];
var x = [];
var y = [];
var xscale = 1;
var yscale = 1;
var canvasx = 2000;
var canvasy = 1000;
var trin = 10000;
var h = 0;
var j = 0;
var auto = false;
var specifikt = [0, 0.016, 0.033, 0.05, 0.066, 0.083, 0.1, 0.116, 0.133, 0.15, 0.166, 0.183, 0.2, 0.216, 0.233, 0.25, 0.266, 0.283, 0.3, 0.316, 0.333, 0.35, 0.366, 0.383, 0.4, 0.416, 0.433, 0.45, 0.466, 0.483, 0.5, 0.516, 0.533];
var specifikx = [0, 0.0427629265343, 0.101973132505, 0.141446603152, 0.184209529686, 0.223683000333, 0.269735382755, 0.315787765176, 0.348682324049, 0.398024162358, 0.440787088892, 0.476971103652, 0.516444574299, 0.555918044946, 0.592102059706, 0.628286074466, 0.671049001, 0.703943559872, 0.740127574632, 0.776311589392, 0.819074515926, 0.865126898348, 0.891442545446, 0.93420547198, 0.97038948674, 0.996705133838, 1.03617860449, 1.06578370747, 1.11183608989, 1.14473064876, 1.18420411941, 1.2138092224, 1.24341432538];
var specifiky = [0, 0.0460523824216, 0.105262588392, 0.151314970814, 0.194077897348, 0.24013027977, 0.282893206304, 0.315787765176, 0.342103412274, 0.37170851526, 0.394734706471, 0.40789253002, 0.417760897681, 0.437497633005, 0.444076544779, 0.447366000667, 0.447366000667, 0.444076544779, 0.43091872123, 0.417760897681, 0.404603074132, 0.388155794696, 0.374997971147, 0.358550691711, 0.345392868162, 0.319077221064, 0.282893206304, 0.236840823882, 0.194077897348, 0.151314970814, 0.115130956054, 0.0690785736323, 0.0296051029853];

function setup() {
    createCanvas(canvasx,canvasy);
    
    background(0);
    frameRate(60);
    speedslider = createSlider(0,trin,trin/2);
    speedslider.position(20,15);
    start = createCheckbox("autotid", false);
    start.position(20,40);
    start.changed(myCheckedEvent);
  t[0] = 0;
  vx[0] = v0*Math.cos(angle);
  vy[0] = v0*Math.sin(angle);
  x[0] = 0;
  y[0] = 0;
  ax[0] = -(D*(v0*Math.cos(angle))**2)/m;
  ay[0] = -((D*(v0*Math.sin(angle))**2)/m)-g;
  eulers(trin);
}

function eulers(n) {
  for(i=0;i<n;i++) {
    t.push(t[i]+dt);
    vx.push(vx[i]+dt*ax[i]);
    vy.push(vy[i]+dt*ay[i]);
    ax.push(-(((D*(vx[i+1]**2))/m)));
    ay.push(-g-((D*(vy[i+1]**2))/m));

  }
  for(i=0;i<n;i++){
    x.push(x[i]+dt*vx[i]);
    y.push(y[i]+dt*vy[i]);
  }
  print(vy);
}
function myCheckedEvent() {
  auto = this.checked();
  
  }
function draw() {
background(0,0,155);
fill(240);
rect(0,0,400,150);
fill(5);
if(!auto) {
j = speedslider.value();

}
text("Tid: "+round(t[j],5)+" s",200,30);

xscale=canvasx/max(x);
yscale=canvasy/max(y);
//test equal scale

yscale = min(yscale,xscale);
xscale = min(yscale,xscale);

if(auto){
  if(j==trin){
    j=0;
  }
  for(h=0;h<j-1;h++){

    fill(0,255,0);
    ellipse((x[h]*xscale),(-y[h]*yscale+canvasy),10,10);
  
  }
  j=j+1;
}
else{
for(h=0;h<j-1;h++){

  fill(0,255,0);
  ellipse((x[h]*xscale),(-y[h]*yscale+canvasy),10,10);
    //fill(255);
    //ellipse((specifikx[int(h/10)]*xscale),(-specifiky[int(h/10)]*yscale+canvasy),10,10);
}


}
fill(255,0,0);
ellipse(x[j]*xscale,-y[j]*yscale+canvasy,20,20);
fill(200);
stroke(125,125,0);
strokeWeight(5);
//line(x[j]*xscale,-y[j]*yscale+canvasy,x[j]*xscale+vx[j]*10,-y[j]*yscale+canvasy);//vx
line(x[j]*xscale,-y[j]*yscale+canvasy,x[j]*xscale+ax[j]*10*m,-y[j]*yscale+canvasy);//f luft x
strokeWeight(1);
//text("vx: "+round(vx[j]),x[j]*xscale+vx[j]*10,-y[j]*yscale+canvasy);
text("F luft x: "+abs(round(vx[j]*m))+" N",x[j]*xscale+ax[j]*10*m-60,-y[j]*yscale+canvasy);
strokeWeight(5);
stroke(0,125,125);
//line(x[j]*xscale,-y[j]*yscale+canvasy,x[j]*xscale,-y[j]*yscale+canvasy-vy[j]*10);//vy
line(x[j]*xscale,-y[j]*yscale+canvasy,x[j]*xscale,-y[j]*yscale+canvasy+vy[j]*10*m);
strokeWeight(1);
//text("vy: "+round(vy[j]),x[j]*xscale,-y[j]*yscale+canvasy-vy[j]*10);
text("F luft y: "+abs(round(vy[j]*m))+" N",x[j]*xscale,-y[j]*yscale+canvasy+vy[j]*10) // f luft y
strokeWeight(5);
stroke(125,0,125);
//line(x[j]*xscale,-y[j]*yscale+canvasy,x[j]*xscale,-y[j]*yscale+canvasy-ay[j]*10);//ay
line(x[j]*xscale,-y[j]*yscale+canvasy,x[j]*xscale,-y[j]*yscale+canvasy+g*m*10); // f g
strokeWeight(1);
text("F g: "+abs(round(g*m))+" N",x[j]*xscale,-y[j]*yscale+canvasy+g*m*10);
strokeWeight(5);
stroke(255,255,0);
//line(x[j]*xscale,-y[j]*yscale+canvasy,x[j]*xscale+vx[j]*10,-y[j]*yscale+canvasy-vy[j]*10);//v
strokeWeight(1);
//text("v: "+round(Math.sqrt(vx[j]**2+vy[j]**2)),x[j]*xscale+vx[j]*10+15,-y[j]*yscale+canvasy-vy[j]*10);

stroke(0);
strokeWeight(1);









}