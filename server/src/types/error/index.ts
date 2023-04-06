export class FieldErrorItem extends Error {
	field: string;
	message: string;
	constructor(field: string, message: string) {
		super();
		this.field = field;
		this.message = message;
	}
	toErrorResponseObject() {
		return {
			field: this.field,
			message: this.message,
		};
	}
	toFieldError() {
		const fieldError = new FieldError();
		fieldError.errors.push(this);
		return fieldError;
	}
}
export class FieldError extends Error{
	public errors: FieldErrorItem[];
	constructor() {
		super();
		this.errors = [];
	}
	toErrorResponseObject() {
		return this.errors.map((e) => e.toErrorResponseObject());
	}
}
