$(document).ready(function(){
    let dataId = '';
    $('.editPost').click(editPost);
    $('.removePost').click(deletePost);
    $('.viewPost').click(viewPost);
    $('#form').submit(function(event){
        event.preventDefault();
        let form = $('#form');
        console.log(form.serialize());
        $.ajax({
            type:'POST',
            url:'/posts',
            data: form.serialize(),
            success: function(post){
                $('#title').val("");
                $('#body').val("");
                $("#createModal").modal('hide');
                let newPost = `
                <tr id="${post._id}">
                    <td>${post.title}</td>
                    <td>
                        <button type="button" class="btn btn-secondary viewPost" data-toggle="modal" data-target="#readModal" data-id="${post._id}">View</button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-info editPost" data-toggle="modal" data-target="#editModal" data-id="${post._id}">Edit</button>
                    </td>
                    <td>
                        <a class="btn btn-danger removePost" href="#" data-id="${post._id}">Delete</a>
                    </td>
                </tr>`;
                $('#posts').append(newPost);
                $('.viewPost').click(viewPost);
            }
        })
    });
    $('#edit-form').submit(function(event){
        event.preventDefault();
        let form = $('#edit-form');
        console.log(dataId);
        $.ajax({
            type: 'PUT',
            url: '/posts/'+dataId,
            data: form.serialize(),
            success: function(editedPost){
                $(`#${dataId} td:first-child`).text(editedPost.title);
                $('#editModal').modal('hide');
            }
        });
    })
    function editPost(){
        dataId = $(this).data('id');
        $.ajax({
            type:'GET',
            url:'/posts/'+dataId,
            success: function(post){
                $('#edit-title').val(post.title);
                $('#edit-body').val(post.body);
            }
        })
    }
    function viewPost(){
        dataId = $(this).data('id');
        console.log(dataId);
        $.ajax({
            type: 'GET',
            url: '/posts/'+dataId,
            success: function(post){
                console.log(post);
                $('#readTitle').text(post.title);
                $('#readBody').text(post.body);
            }
        })
    }
    function deletePost(){
       if (confirm('Are you sure?')) {
           $.ajax({
               type: 'DELETE',
               url: '/posts/'+$(this).data('id'),
               success: function(){
                   $(`#${$(this).data('id')}`).remove();
               }
           });
           $(`#${$(this).data('id')}`).remove();
       }
    }
});