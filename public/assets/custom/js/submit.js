		
// add data in ajax
(function ( $ ) {	
    $.fn.ajax_submit = function(options){	
        form_id= this;
        //console.log('press')

        var settings = $.extend({
            url: "",
            type : 'post',
            reset : true,
            modal_hide:true,
            callback : null
        }, options );

        const waitingToast = createToast(
            '<i class="fa-solid fa-arrows-rotate fa-spin"></i> <strong>Waiting for response...</strong>.', {
            title: 'Invigo',
            headerClass: 'bg-primary text-white',
            showCloseButton: false,
            delay: -1,
            imageUrl: '/assets/images/logo-sm.png'
        });
                
        $(form_id).ajaxForm({
            url: settings.url,
            type: settings.type,
            beforeSubmit : function(){
                //console.log('before')
                form_id.find('button[type="submit"]').attr('disabled',true);
                waitingToast();
            },
            
            success:function(res){
                //console.log('after')
                form_id.find('button[type="submit"]').attr('disabled',false);
                
                try{
                    jd=JSON.parse(res);
                    if(jd["stt"] == 'ok'){
                        removeAllToasts();

                        createToast(jd["msg"], {
                            title: 'Invigo',
                            headerClass: 'bg-success text-white border-0',
                            showCloseButton: true,
                            delay: 3000,
                            imageUrl: '/assets/images/logo-sm.png'
                        });

                        if ($.isFunction(settings.callback)) {
                            var relt = true;
                            var id = jd["data"];
                            settings.callback.call(this, id);
                        }

                        //clear form
                        if(settings.reset){
                            $(form_id)[0].reset();	
                            $('.form-control').val('');	
                            //empty selections
                            $('.select').val(null).trigger('change');
                        }
                                
                        form_id.find('button[type="submit"]').attr('disabled',false);
                        
                        if(settings.modal_hide){
                            $('.modal').modal('hide');
                        }
                            
                    }else if(jd["stt"] == 'error'){
                        removeAllToasts();
                        createToast(jd["msg"], {
                            title: 'Invigo',
                            headerClass: 'bg-danger text-white border-0',
                            showCloseButton: true,
                            delay: 3000,
                            imageUrl: '/assets/images/logo-sm.png'
                        });							
                            
                        if ($.isFunction(settings.callback)) {
                            var relt = false;
                            var id = jd["data"];
                            settings.callback.call(this,id);
                        }							
                        form_id.find('button[type="submit"]').attr('disabled',false);
                    }
                } catch (e){
                    console.error(e);
                    removeAllToasts();
                    createToast('<p>Something went wrong...</p>', {
                        title: 'Invigo',
                        headerClass: 'bg-danger text-white border-0',
                        showCloseButton: true,
                        delay: 3000,
                        imageUrl: '/assets/images/logo-sm.png'
                    });
                    form_id.find('button[type="submit"]').attr('disabled',false);
                }	 	
            },
            error : function(e){
                console.error(e);
                removeAllToasts();
                createToast('<p>Something went wrong...</p>', {
                    title: 'Invigo',
                    headerClass: 'bg-danger text-white border-0',
                    showCloseButton: true,
                    delay: 3000,
                    imageUrl: '/assets/images/logo-sm.png'
                });
                form_id.find('button[type="submit"]').attr('disabled',false);
            }
        });	
    }	
}( jQuery ));	 			          