import struct,zlib,sys
d=open(sys.argv[1],'rb').read(); ver=struct.unpack('<I',d[23:27])[0]; W=8 if ver>=7500 else 4
def prop(o):
    t=chr(d[o]);o+=1
    if t in 'YCILFD':
        f={'Y':'<h','C':'?','I':'<i','L':'<q','F':'<f','D':'<d'}[t];s=struct.calcsize(f);return struct.unpack_from(f,d,o)[0],o+s
    if t in 'fdlib':
        n,enc,cl=struct.unpack_from('<III',d,o);o+=12;raw=d[o:o+cl];o+=cl
        if enc: raw=zlib.decompress(raw)
        f={'f':'f','d':'d','l':'q','i':'i','b':'?'}[t];return struct.unpack('<%d%s'%(n,f),raw),o
    if t in 'SR':
        n=struct.unpack_from('<I',d,o)[0];o+=4;return d[o:o+n],o+n
def node(o):
    if W==8: end,np_,pl=struct.unpack_from('<QQQ',d,o);o+=24
    else: end,np_,pl=struct.unpack_from('<III',d,o);o+=12
    nl=d[o];o+=1;name=d[o:o+nl].decode();o+=nl
    if end==0: return None,o
    props=[];p=o
    for _ in range(np_): v,p=prop(p);props.append(v)
    o+=pl;kids=[]
    while o<end-(13 if W==4 else 25):
        k,o=node(o)
        if k is None: break
        kids.append(k)
    return (name,props,kids),end
o=27;top=[]
while o<len(d)-200:
    n,o=node(o)
    if n is None: break
    top.append(n)
objs=[k for n in top if n[0]=='Objects' for k in n[2]]
geo={};mod={};pidx={}
for n,p,k in objs:
    if n=='Geometry':
        for kk in k:
            if kk[0]=='Vertices': geo[p[0]]=kk[1][0]
            if kk[0]=='PolygonVertexIndex': pidx[p[0]]=kk[1][0]
    if n=='Model': mod[p[0]]=p[1].split(b'\x00')[0].decode('latin-1')
conn=[k for n in top if n[0]=='Connections' for k in n[2]]
g2m={c[1][1]:c[1][2] for c in conn if c[1][1] in geo}
m2g={c[1][2]:c[1][1] for c in conn if c[1][1] in geo and c[1][2] in mod}
