const express = require('express');
const router = express.Router();
const members = require('../../Members'); 
const uuid = require('uuid')


//Get all members
router.get('/', (req, res) => {
	res.json(members);
});

//Get member by id
router.get('/:id', (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));
	if (found) {
		res.json(members.filter(member => member. id === parseInt(req.params.id)));
	} else {
		res.status(400).json({msg:` no member with the id ${req.params.id}`})
	}
});

//Create member
router.post('/', (req, res) => {
	const newMember = {
		id: uuid.v4(),
		name: req.body.name,
		email: req.body.email
	}

	if(!newMember.name || !newMember.email) {
		return res.status(400).json({msg: 'Name and email needed'});
	}

	members.push(newMember);

	res.json(members);
});

//Update member
router.put('/:id', (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));
	if (found) {
		const updateMember = req.body;
		members.forEach(member => {
			if(member.id === parseInt(req.params.id)) {
				member.name = updateMember.name ? updateMember.name : member.name;
				member.email = updateMember.email ? updateMember.email : member.email;

				res.json({msg: "Member updated", member});
			}
		});
	} else {
		res.status(400).json({msg:` no member with the id ${req.params.id}`})
	}
});

//Delete user by id
router.delete('/:id', (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));
	if (found) {
		res.json({msg: "member deleted", members: members.filter(member => member. id !== parseInt(req.params.id))});
	} else {
		res.status(400).json({msg:` no member with the id ${req.params.id}`})
	}
});


module.exports = router;