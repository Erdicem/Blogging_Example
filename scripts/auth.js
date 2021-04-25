
// auth durumunu izle 

auth.onAuthStateChanged(k=>{
    //console.log(k);
    if(k){
        console.log("giriş işlemi başarılı");
        // verileri getir

        db.collection('makaleler').onSnapshot(snapshot=>{
            //console.log(snapshot.docs);
            makaleYukle(snapshot.docs);
            kullaniciYukle(k);
        })
    }
    else{
        console.log("Çıkış İşlemi Başarılı");
        makaleYukle([]);
        kullaniciYukle();
    }
})

// Makale Oluştur

const makaleOlusturForm = document.querySelector('#create-form');

makaleOlusturForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    db.collection('makaleler').add({
        baslik:makaleOlusturForm['title'].value,
        icerik:makaleOlusturForm['content'].value
    }).then(()=>{// modal kapatma ve reset işlemi..
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        makaleOlusturForm.reset();
    }).catch(err=>{
        console.log(err.message);
    })
})


// Üyelik Oluştur

const uyelikForm = document.querySelector('#signup-form');

uyelikForm.addEventListener('submit',(e)=>{
    
    e.preventDefault();
    
    const mail = uyelikForm['signup-email'].value;
    const parola =uyelikForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(mail,parola).then(sonuc=>{
        console.log(sonuc.user);// üye oluştu


        return db.collection('kullanicilar').doc(sonuc.user.uid).set({
            bio:uyelikForm['signup-bio'].value
        }).then(()=>{
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            uyelikForm.reset();
        })
      
    });
    
});


// Çıkış İşlemi 

const cikis= document.querySelector('#logout');

cikis.addEventListener('click',(e)=>{
    e.preventDefault();

    auth.signOut().then(()=>{
        //console.log("çikiş işlemi başarılı");
    });
})


// Giriş İşlemi

const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const mail = loginForm['login-email'].value;
    const parola =loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(mail,parola).then((sonuc)=>{
            //console.log(sonuc.user);

            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            loginForm.reset();
    });
});


