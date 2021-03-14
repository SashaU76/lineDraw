const particles=[]
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})
let hue = 0
const mouse = {
    x: 500,
    y: 500
}
canvas.addEventListener('click', function(event){
    mouse.x = event.x
    mouse.y = event.y
    for(let i = 0; i<1;i++){
        particles.push(new Particle())
    }
    
})
canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x
    mouse.y = event.y
    for(let i = 0; i<15;i++){
        particles.push(new Particle())
    }
})



class Particle {
    constructor(){
        this.x = mouse.x
        this.y = mouse.y
        this.size = Math.random() * 5 +5
        this.speedX = Math.random() * 3 -1.5
        this.speedY = Math.random() * 3 -1.5
        this.color = 'hsl('+hue+',100%, 50%)'
    }
    update(){
        this.x +=this.speedX
        this.y +=this.speedY
        if(this.size>0.2) this.size -=0.1
    }
    draw(){
        //ctx.fillStyle = 'rgb(250, 107, 168)'
        ctx.fillStyle = this.color
        
        //ctx.lineWidth = '10'
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2)
        //ctx.stroke()
        ctx.fill()
    }
}


function handleParticles(){
    for(let i = 0; i <particles.length; i++){
        particles[i].update()
        particles[i].draw()
        
        /* for(let j = i; j < particles.length; j++){
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const distance = Math.sqrt(dx*dx+dy*dy)
            if(distance<100){
                ctx.beginPath()
                ctx.strokeStyle  = particles[i].color
                ctx.lineWidth= particles[i].size/4
                ctx.moveTo(particles[i].x, particles[i].y)
                ctx.lineTo(particles[j].x, particles[j].y)
                ctx.stroke()
            }
        } */
        if(particles[i].size <=0.3){
            particles.splice(i,1);
            i--
        }
    }
}
function animate(){
    //ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = 'rgba(0,0,0,0.02)'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    handleParticles()
    requestAnimationFrame(animate)
    hue+=0.5
}
animate()
