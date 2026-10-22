/* Enquiry form: validation, saving, WhatsApp click-to-chat button */
let busy=false,OWNER_WA="";
const WA_ICON='<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" style="vertical-align:-4px;margin-right:6px"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.700 6.700 0 0 1-3.300-2.900c-.2-.4.2-.4.700-1.300.1-.2 0-.3 0-.4l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.300-.2.300-.9.900-.9 2.200s.9 2.500 1 2.700c.1.200 1.800 2.800 4.500 3.900 1.700.7 2.300.8 3.200.6.500-.1 1.500-.6 1.700-1.200.2-.6.2-1.100.1-1.200-.1-.1-.2-.2-.5-.3z"/></svg>';
const waLink=d=>{if(!OWNER_WA)return"";const t=["ASP CONSTRUCTION — NEW ENQUIRY","","Name: "+d.name,"Phone: "+d.phone,"Email: "+d.email,"Service Required: "+d.service,"Location: "+d.location,"Project Type: "+d.type,"Budget: "+(d.budget||"-"),"Expected Start Date: "+(d.start||"-"),"Project Description: "+d.details,"","Please contact me regarding this enquiry."].join("\n");return `https://wa.me/${OWNER_WA}?text=${encodeURIComponent(t)}`};
if(CONFIG.endpoint)fetch(CONFIG.endpoint.replace(/enquiries$/,"config")).then(r=>r.json()).then(j=>{if(/^\d{10,15}$/.test(j.ownerWhatsapp||""))OWNER_WA=j.ownerWhatsapp}).catch(()=>{});
let last=0;
$("#f").onsubmit=async e=>{e.preventDefault();const v=id=>$("#"+id).value.trim(),er={},res=$("#res");
 if(v("hp"))return;
 if(v("n").length<2)er.n="Enter your full name.";
 if(!/^(\+91|0)?[6-9]\d{9}$/.test(v("p").replace(/[\s-]/g,"")))er.p="Enter a valid 10-digit Indian mobile number.";
 if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v("m")))er.m="Enter a valid email address.";
 if(!v("s"))er.s="Choose a service.";if(!v("l"))er.l="Choose a location.";if(!v("y"))er.y="Choose a project type.";
 if(v("t").length<10)er.t="Describe your project in at least 10 characters.";
 if(!$("#c").checked)er.c="Please agree so we can respond to you.";
 ["n","p","m","s","l","y","t","c"].forEach(i=>{$("#e-"+i).textContent=er[i]||"";$("#"+i).setAttribute("aria-invalid",!!er[i])});
 if(Object.keys(er).length){res.className="msg bad";res.textContent="Please fix the highlighted fields.";document.querySelector("[aria-invalid=true]").focus();return}
 if(Date.now()-last<8000)return;
 const data={name:v("n"),phone:v("p"),email:v("m"),service:v("s"),location:v("l"),type:v("y"),budget:v("b"),start:v("d"),details:v("t"),website:v("hp")},btn=$("#go");
 if(!CONFIG.endpoint){res.className="msg bad";res.textContent="Your enquiry was not saved. Enquiry saving isn’t set up on this site yet.";return}
 if(busy)return;busy=true;btn.disabled=true;btn.textContent="Saving…";res.className="msg";res.textContent="Saving your enquiry…";
 try{const r=await fetch(CONFIG.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
  const j=await r.json().catch(()=>({}));if(!r.ok)throw j;
  const link=waLink(data);res.className="msg ok";
  res.innerHTML="<p style=\"margin:0 0 12px\">Thank you. Your enquiry has been saved."+(link?" To reach us quickly, send it on WhatsApp. You’ll need to press Send in WhatsApp.":"")+"</p>"+(link?`<a class="btn wa" href="${link}" target="_blank" rel="noopener noreferrer">${WA_ICON} Send Enquiry on WhatsApp</a>`:"<p style=\"margin:0\">WhatsApp sending isn’t set up yet. We’ll review your saved enquiry.</p>");
  $("#f").reset();
 }catch(x){res.className="msg bad";res.textContent=(x&&x.message)||"Your enquiry could not be saved. Your details are still in the form, so please try again."}
 finally{busy=false;btn.disabled=false;btn.textContent="Request a Quote"}
};
