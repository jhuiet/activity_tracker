# Activity Tracker API
This api is used to track activities and users that interact with said activities

## Version: 1.0.0

**Contact information:**  
huietj1@nku.eud  

**License:** [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

### /users

#### GET
##### Summary:

returns all Users

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Users found in database |

#### POST
##### Summary:

Create a User with form data

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | User created |
| 400 | invalid input, User information invalid |
| 409 | That user already exists |

### /users/points

#### GET
##### Summary:

get the points for all users

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful operation |

### /users/{userId}

#### GET
##### Summary:

Gets a user by ID.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| userId | path | User ID | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful operation |
| 400 | Invalid Id |
| 404 | User not found |

#### PUT
##### Summary:

update a user based on id using form data

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| userId | path | User ID | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | User updated |
| 400 | Invalid Id |
| 404 | User not found |

#### DELETE
##### Summary:

Deletes a user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| userId | path | User id to delete | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | user deleted |
| 400 | Invalid ID supplied |
| 404 | User not found |

### /users/homeDays

#### GET
##### Summary:

Get all work from home days for all users

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Operation successful |

### /users/{userId}/homeDays

#### GET
##### Summary:

Get all work from home days for a user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| userId | path | User ID | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Operation successful |
| 404 | User Id not found |

#### POST
##### Summary:

Create a work from home day request for a user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| userId | path | User ID | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Operation successful |
| 400 | Invalid status entered |
| 404 | User Id not found |

### /users/homeDays/{dayId}

#### PUT
##### Summary:

Update a work from home day request for a user, altering the status.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| dayId | path | Home Day ID | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Operation successful |
| 400 | Invalid status entered |
| 404 | User Id not found |

### /activities

#### GET
##### Summary:

Get an Array of activities

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Operation successful |

#### POST
##### Summary:

Create an activity with form data

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Activity Created |
| 400 | invalid input, Activity information invalid |

### /activities/{activityId}

#### PUT
##### Summary:

Update an activity with form data

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| activityId | path | Activity ID | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Activity Updated |
| 400 | Invalid activity information entered |
| 404 | Activity not found |

#### GET
##### Summary:

get an activity by Id

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| activityId | path | Activity ID | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Operation Successful |
| 400 | Invalid activity Id |
| 404 | Activity not found |

#### DELETE
##### Summary:

delete an activity by Id

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| activityId | path | Activity ID | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Activity Deleted |
| 400 | Invalid activity Id |
| 404 | Activity not found |

### /Activity/{activityId}/Users

#### GET
##### Summary:

Get users involved with an activity

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| activityId | path | Activity ID | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Operation successful |
| 404 | Invalid Activity Id |

### /Activity/{activityId}/User/{userId}

#### GET
##### Summary:

Get info about a user attending an Activity

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| activityId | path | Activity ID | Yes | long |
| userId | path | User ID | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Operation successful |
| 404 | Invalid Activity or User Id |

#### POST
##### Summary:

Set user status for an activity

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| activityId | path | Activity ID | Yes | long |
| userId | path | User ID | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Operation successful |
| 400 | Invalid rsvp value entered. please enter yes, no, or maybe |
| 404 | Invalid Activity or User Id |

#### PUT
##### Summary:

Update user status and attendance for an activity

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| activityId | path | Activity ID | Yes | long |
| userId | path | User ID | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Operation successful |
| 400 | Invalid values entered for rsvp or attendance |
| 404 | Invalid Activity or User Id |

#### DELETE
##### Summary:

Delete user status and attendance for an activity

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| activityId | path | Activity ID | Yes | long |
| userId | path | User ID | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Operation successful |
| 404 | Invalid Activity or User Id |

### /tags

#### GET
##### Summary:

Get all tags

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Operation Successful |

#### POST
##### Summary:

Create a tag

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Tag Created |
| 400 | Invalid tag entered |

### /tags/{tagId}

#### GET
##### Summary:

Get a tag

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| tagId | path | Tag ID | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Tag Updated |
| 404 | Invalid tag Id |

#### PUT
##### Summary:

Update a tag

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| tagId | path | Tag ID | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Tag Updated |
| 400 | Invalid tags |
| 404 | Invalid tag Id |

#### DELETE
##### Summary:

Delete a tag

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| tagId | path | Tag ID | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Tag Deleted |
| 404 | Invalid tag Id |

### /users/{userId}/tags

#### GET
##### Summary:

Get tags for a user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| userId | path | user ID | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Operation successful |
| 404 | Invalid User Id |

#### POST
##### Summary:

Add tags for a user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| userId | path | user ID | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Tags added |
| 400 | Invalid tags |
| 404 | Invalid User Id |

### /users/{userId}/tags/delete

#### POST
##### Summary:

Delete tags for a user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| userId | path | user ID | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Tags Deleted |
| 404 | Invalid User Id |

### /activity/{activityId}/tags

#### GET
##### Summary:

Get tags for an activity

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| activityId | path | activity ID | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | operation successful |
| 404 | Invalid activity Id |

#### POST
##### Summary:

Add tags to an activity

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| activityId | path | activity ID | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Tags addded |
| 400 | Invalid tags |
| 404 | Invalid activity Id |

### /activity/{activityId}/tags/delete

#### POST
##### Summary:

Delete tags for an activity

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| activityId | path | activity ID | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Tags Deleted |
| 400 | Invalid tag Id's |
| 404 | Invalid Activity Id |
