import LiteDom from 'https://cdn.pika.dev/litedom@^0.12.1';

LiteDom({
	tagName: 'ld-dropzone',
	data: {style:
	{
		'box-sizing': 'border-box;',
		width: '100%;',
		'min-height': '6rem;',
		padding: '0.5rem;',
		margin: 0,
		'background-color': '#f6f6f6;',
		border: '1px solid #e4e4e4;',
		color: '#919191;',
		display: 'flex;',
		'justify-content': 'center;',
		'align-items': 'center;',
		'text-align': 'center;',
		padding: '0.5rem;',
		fontSize: '0.75rem;',
		cursor: 'pointer;',
	}
	},
	template: `<section class="ld-dropzone-section" :style="this.style" @click="alertHello">
		<p>Drop image here or click to upload</p>
		<input type="file" style="display: none" name="featured-image" id="featured-image">
	</section>`,
	alertHello(event) {
		alert('Hello');
	}
});