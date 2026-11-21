import math
def M(t):
    tx,ty,tz=t.get('Lcl Translation',(0,0,0)); rx,ry,rz=[math.radians(a) for a in t.get('Lcl Rotation',(0,0,0))]; sx,sy,sz=t.get('Lcl Scaling',(1,1,1))
    cx,sx_=math.cos(rx),math.sin(rx);cy,sy_=math.cos(ry),math.sin(ry);cz,sz_=math.cos(rz),math.sin(rz)
    Rx=[[1,0,0],[0,cx,-sx_],[0,sx_,cx]];Ry=[[cy,0,sy_],[0,1,0],[-sy_,0,cy]];Rz=[[cz,-sz_,0],[sz_,cz,0],[0,0,1]]
    mm=lambda A,B:[[sum(A[i][k]*B[k][j] for k in range(3)) for j in range(3)] for i in range(3)]
    R=mm(Rz,mm(Ry,Rx)); return [[R[i][j]*(sx,sy,sz)[j] for j in range(3)] for i in range(3)],(tx,ty,tz)
def world(mid,p):
    m=mid
    while m in mod:
        R,T=M(P[m]); p=[sum(R[i][j]*p[j] for j in range(3))+T[i] for i in range(3)]; m=par.get(m)
    return p
