P={}
for n,p,k in objs:
    if n=='Model':
        t={}
        for kk in k:
            if kk[0]=='Properties70':
                for pp in kk[2]:
                    key=pp[1][0].decode()
                    if key.startswith('Lcl') or key in('GeometricTranslation','PreRotation'): t[key]=pp[1][4:]
        P[p[0]]=t
par={c[1][1]:c[1][2] for c in conn if c[1][1] in mod}
